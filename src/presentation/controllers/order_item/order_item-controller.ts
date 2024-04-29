import { OrderItem } from '@/core/domain/models/order_item.entity';
import { IDbAddOrderItemRepository } from '@/core/domain/protocols/db/order_item/add-order_item-repository';
import { IDbDeleteOrderItemRepository } from '@/core/domain/protocols/db/order_item/delete-order_item-repository';
import { IDbListOrderItemRepository } from '@/core/domain/protocols/db/order_item/list-order_item-respository';
import { IDbUpdateOrderItemRepository } from '@/core/domain/protocols/db/order_item/update-order_item-repository';
import { AddOrderItemDto } from '@/presentation/dtos/order_item/add-order_item.dto';
import { OrderItemDto } from '@/presentation/dtos/order_item/order_item-model.dto';
import { UpdateOrderItemDto } from '@/presentation/dtos/order_item/update-order_item.dto';
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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Order Item')
@Controller('api/v1/order_items')
export class OrderItemController {
  constructor(
    private readonly dbAddOrderItem: IDbAddOrderItemRepository,
    private readonly dbListOrderItem: IDbListOrderItemRepository,
    private readonly dbUpdateOrderItem: IDbUpdateOrderItemRepository,
    private readonly dbDeleteOrderItem: IDbDeleteOrderItemRepository,
  ) {}

  @ApiBody({
    description: 'Create OrderItem',
    type: AddOrderItemDto,
  })
  @ApiCreatedResponse({ type: OrderItemDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  async create(@Body() payload: AddOrderItemDto): Promise<OrderItemDto> {
    return await this.dbAddOrderItem.create(payload);
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns order_items.',
    status: HttpStatus.OK,
    type: OrderItemDto,
    isArray: true,
  })
  @ApiBearerAuth()
  async getAll(): Promise<OrderItemDto[]> {
    try {
      return await this.dbListOrderItem.getAll();
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Put(':id')
  @ApiBody({
    type: UpdateOrderItemDto,
  })
  @ApiOkResponse({
    description: 'Delete success.',
    status: HttpStatus.OK,
    type: OrderItemDto,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    try {
      return await this.dbUpdateOrderItem.update(payload, id);
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
      return await this.dbDeleteOrderItem.delete(id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
