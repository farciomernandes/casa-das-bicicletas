import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Ip,
  Param,
  Post,
  Put,
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
import { OrderModel } from '@/presentation/dtos/order/order-model.dto';
import { IDbDeleteOrderRepository } from '@/core/domain/protocols/db/order/delete-order-repository';
import { IDbUpdateOrderRepository } from '@/core/domain/protocols/db/order/update-order-repository';
import { Order } from '@/core/domain/models/order.entity';
import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';
import { UpdateOrderDto } from '@/presentation/dtos/order/update-order.dto';
import { ICheckoutOrder } from '@/core/domain/protocols/payment/checkout-order';
import { PaymentDataDto } from '@/presentation/dtos/checkout/process-payment.dto';

@ApiTags('Order')
@Controller('api/v1/order')
export class OrderController {
  constructor(
    private readonly dbAddOrder: IDbAddOrderRepository,
    private readonly dbListOrder: IDbListOrderRepository,
    private readonly dbUpdateOrder: IDbUpdateOrderRepository,
    private readonly dbDeleteOrder: IDbDeleteOrderRepository,
    private readonly checkoutOrder: ICheckoutOrder,
  ) {}

  @ApiBody({
    description: 'Create Order',
    type: AddOrderDto,
  })
  @ApiCreatedResponse({ type: OrderModel })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  async create(@Body() payload: AddOrderDto): Promise<OrderModel> {
    return await this.dbAddOrder.create(payload);
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns Orders.',
    status: HttpStatus.OK,
    type: OrderModel,
    isArray: true,
  })
  @ApiBearerAuth()
  async getAll(): Promise<OrderModel[]> {
    try {
      return await this.dbListOrder.getAll();
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Put(':id')
  @ApiBody({
    type: UpdateOrderDto,
  })
  @ApiOkResponse({
    description: 'Delete success.',
    status: HttpStatus.OK,
    type: OrderModel,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateOrderDto,
  ): Promise<OrderModel> {
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
    type: PaymentDataDto,
  })
  @ApiCreatedResponse({ type: OrderModel })
  @Post('checkout/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  async checkout(
    @Param('id') order_id: string,
    @Body() payload: PaymentDataDto,
    @Ip() ip,
  ): Promise<any> {
    const user_id = 'd8748c4e-639c-4fa9-9dc4-98099fac82a4';
    return await this.checkoutOrder.process(order_id, user_id, payload);
  }
}
