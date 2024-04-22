import { IDbListOrderRepository } from '@/core/domain/protocols/db/order/list-order-respository';
import { Injectable } from '@nestjs/common';
import { Order } from '@/core/domain/models/order.entity';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';

@Injectable()
export class DbListOrder implements IDbListOrderRepository {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getAll(): Promise<Order[]> {
    return await this.orderRepository.getAll();
  }
}
