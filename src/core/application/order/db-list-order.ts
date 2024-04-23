import { Injectable } from '@nestjs/common';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import {
  OrderItemLocally,
  OrderModel,
  UserOrderDto,
} from '@/presentation/dtos/order/order-model.dto';
import { ProductModelDto } from '@/presentation/dtos/product/product-model.dto';
@Injectable()
export class DbListOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getAll(): Promise<OrderModel[]> {
    const orders = await this.orderRepository.getAll();
    return orders.map((order) => {
      return {
        ...OrderModel.toDto(order),
        user: UserOrderDto.toDto(order.user),
        order_items: order.order_items.map((item) => {
          return {
            ...OrderItemLocally.toDto(item),
            product: ProductModelDto.toDto(item.product),
          };
        }),
      };
    });
  }
}
