import { Injectable } from '@nestjs/common';
import { IDbUpdateOrderItemRepository } from '@/core/domain/protocols/db/order_item/update-order_item-repository';
import { OrderItem } from '@/core/domain/models/order_item.entity';
import { OrderItemRepository } from '@/core/domain/protocols/repositories/order_item';
import { UpdateOrderItemDto } from '@/presentation/dtos/order_item/update-order_item.dto';

@Injectable()
export class DbUpdateOrderItem implements IDbUpdateOrderItemRepository {
  constructor(private readonly orderItemRepository: OrderItemRepository) {}

  async update(payload: UpdateOrderItemDto, id: string): Promise<OrderItem> {
    try {
      return await this.orderItemRepository.update(payload, id);
    } catch (error) {
      throw error;
    }
  }
}
