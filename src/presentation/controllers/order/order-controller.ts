import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IDbAddOrderRepository } from '@/core/domain/protocols/db/order/add-order-repository';
import { IDbListOrderRepository } from '@/core/domain/protocols/db/order/list-order-respository';
import { IDbDeleteOrderRepository } from '@/core/domain/protocols/db/order/delete-order-repository';
import { IDbUpdateOrderRepository } from '@/core/domain/protocols/db/order/update-order-repository';
import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';
import { UpdateOrderDto } from '@/presentation/dtos/order/update-order.dto';
import { ICheckoutOrder } from '@/core/domain/protocols/payment/checkout-order';
import { CheckoutOrderDto } from '@/presentation/dtos/checkout/process-payment.dto';
import { PaymentConfirmedDto } from '@/presentation/dtos/order/order-payment-confirmed.dto';
import { OrderStatusEnum } from '@/shared/enums/order_status.enum';
import { RolesGuard } from '@/infra/guards/roles.guard';
import { Roles } from '@/shared/decorators/roles.decorator';
import { RolesEnum } from '@/shared/enums/roles.enum';
import { User } from '@/shared/decorators/user.decorator';
import { Authenticated } from '@/presentation/dtos/auth/authenticated.dto';
import { IDbFindOrderByIdRepository } from '@/core/domain/protocols/db/order/find-order-by-id-repository';

import { CheckoutOrderModelDto } from '@/presentation/dtos/order/checkout-order.dto';
import {
  GetAllOrdersDto,
  OrderModelDto,
  OrderParamsDto,
} from '@/presentation/dtos/order/order-model.dto';
import {
  CalculateInterestDTO,
  InterestResultDTO,
} from '@/presentation/dtos/helpers/calculate-interest.dto';
import { IInterestCalculator } from '@/core/domain/protocols/helpers/interest-calculator';

@ApiTags('Order')
@Controller('api/v1/orders')
export class OrderController {
  constructor(
    private readonly dbAddOrder: IDbAddOrderRepository,
    private readonly dbListOrder: IDbListOrderRepository,
    private readonly dbUpdateOrder: IDbUpdateOrderRepository,
    private readonly dbDeleteOrder: IDbDeleteOrderRepository,
    private readonly dbFindOrderById: IDbFindOrderByIdRepository,
    private readonly checkoutOrder: ICheckoutOrder,
    private readonly calculateInterest: IInterestCalculator,
  ) {}

  @ApiBody({
    description: 'Create Order',
    type: AddOrderDto,
  })
  @ApiCreatedResponse({ type: OrderModelDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  async create(
    @Body() payload: AddOrderDto,
    @User() user: Authenticated,
  ): Promise<OrderModelDto> {
    return await this.dbAddOrder.create(payload, user.id);
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns Orders.',
    status: HttpStatus.OK,
    type: GetAllOrdersDto,
  })
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  async getAll(
    @User() user: Authenticated,
    @Query() queryParams: OrderParamsDto,
  ): Promise<GetAllOrdersDto> {
    try {
      return await this.dbListOrder.getAll(queryParams, user);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Returns Orders.',
    status: HttpStatus.OK,
    type: OrderModelDto,
  })
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  async findById(@Param('id') id: string): Promise<OrderModelDto> {
    try {
      return await this.dbFindOrderById.findById(id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Put(':id')
  @ApiBody({
    type: UpdateOrderDto,
  })
  @ApiOkResponse({
    description: 'Update success.',
    status: HttpStatus.OK,
    type: OrderModelDto,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateOrderDto,
  ): Promise<OrderModelDto> {
    try {
      return await this.dbUpdateOrder.update(payload, id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete success.',
    status: HttpStatus.OK,
  })
  @ApiBearerAuth()
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return await this.dbDeleteOrder.delete(id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @ApiBody({
    description: 'Calculate Interest',
    type: CalculateInterestDTO,
  })
  @ApiCreatedResponse({ type: [InterestResultDTO] })
  @Post('calculate_interest')
  @HttpCode(HttpStatus.OK)
  async calculate_feels(
    @Body() payload: CalculateInterestDTO,
  ): Promise<InterestResultDTO[]> {
    return this.calculateInterest.calculateInterest(payload);
  }

  @ApiBody({
    type: CheckoutOrderDto,
  })
  @ApiCreatedResponse({ type: CheckoutOrderModelDto })
  @Post('checkout/:id')
  @HttpCode(HttpStatus.CREATED)
  @Roles(RolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  async checkout(
    @Param('id') order_id: string,
    @Body() payload: CheckoutOrderDto,
    @User() user: Authenticated,
  ): Promise<CheckoutOrderModelDto> {
    return await this.checkoutOrder.process(order_id, user.id, payload);
  }

  @Post('payment-webhook')
  async handleWebhook(
    @Body() body: PaymentConfirmedDto,
  ): Promise<{ received: boolean }> {
    switch (body.event) {
      case 'PAYMENT_CONFIRMED':
        const paymentReceived = body.payment;
        const id = paymentReceived.externalReference.split(' - ')[1].trim();
        const payload = {
          status: OrderStatusEnum.PAID,
          total: paymentReceived.value,
          transaction_id: paymentReceived.id,
        };
        await this.dbUpdateOrder.update(payload, id);
        break;
      default:
        console.log(`Este evento não é aceito: ${body.event}`);
    }

    return { received: true };
  }
}
