import { IDbListOrderItemRepository } from '@/core/domain/protocols/db/order_item/list-order_item-respository';
import { Injectable } from '@nestjs/common';
import { OrderItemRepository } from '@/core/domain/protocols/repositories/order_item';
import { OrderItemDto } from '@/presentation/dtos/order_item/order_item-model.dto';
import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';
import { AddProductModelDto } from '@/presentation/dtos/product/add-product.dto';

@Injectable()
export class DbListOrderItem implements IDbListOrderItemRepository {
  constructor(private readonly orderItemRepository: OrderItemRepository) {}

  async getAll(): Promise<OrderItemDto[]> {
    const orders = await this.orderItemRepository.getAll();

    return orders.map((order) => {
      return {
        ...OrderItemDto.toDto(order),
        order: AddOrderDto.toDto(order.order),
        product: AddProductModelDto.toDto(order.product),
      };
    });
  }
}
