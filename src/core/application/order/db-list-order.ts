import { IDbListOrderRepository } from '@/core/domain/protocols/db/order/list-order-respository';
import { Injectable } from '@nestjs/common';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import {
  OrderModel,
  UserOrderDto,
} from '@/presentation/dtos/order/order-model.dto';

@Injectable()
export class DbListOrder implements IDbListOrderRepository {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getAll(): Promise<OrderModel[]> {
    const orders = await this.orderRepository.getAll();

    return orders.map((order) => {
      console.log(order);
      return {
        ...OrderModel.toDto(order),
        user: UserOrderDto.toDto(order.user),
      };
    });
  }
}
