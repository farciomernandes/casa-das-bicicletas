import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbDeleteOrderItemRepository } from '@/core/domain/protocols/db/order_item/delete-order_item-repository';
import { OrderItemRepository } from '@/core/domain/protocols/repositories/order_item';

@Injectable()
export class DbDeleteOrderItem implements IDbDeleteOrderItemRepository {
  constructor(private readonly orderItemRepository: OrderItemRepository) {}

  async delete(id: string): Promise<void> {
    const alreadyExists = await this.orderItemRepository.findById(id);

    if (!alreadyExists) {
      throw new BadRequestException(`OrderItem not found`);
    }
    await this.orderItemRepository.delete(id);
  }
}
