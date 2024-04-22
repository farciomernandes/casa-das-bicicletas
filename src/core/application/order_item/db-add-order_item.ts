import { Injectable } from '@nestjs/common';
import { IDbAddOrderItemRepository } from '@/core/domain/protocols/db/order_item/add-order_item-repository';
import { OrderItem } from '@/core/domain/models/order_item.entity';
import { OrderItemRepository } from '@/core/domain/protocols/repositories/order_item';
import { AddOrderItemDto } from '@/presentation/dtos/order_item/add-order_item.dto';

@Injectable()
export class DbAddOrderItem implements IDbAddOrderItemRepository {
  constructor(private readonly orderItemRepository: OrderItemRepository) {}

  async create(payload: AddOrderItemDto): Promise<OrderItem> {
    return await this.orderItemRepository.create(payload);
  }
}
