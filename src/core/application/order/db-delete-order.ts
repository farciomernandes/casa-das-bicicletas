import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbDeleteOrderRepository } from '@/core/domain/protocols/db/order/delete-order-repository';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';

@Injectable()
export class DbDeleteOrder implements IDbDeleteOrderRepository {
  constructor(private readonly orderRepository: OrderRepository) {}

  async delete(id: string): Promise<void> {
    const alreadyExists = await this.orderRepository.findById(id);

    if (!alreadyExists) {
      throw new BadRequestException(`Order not found`);
    }
    await this.orderRepository.delete(id);
  }
}
