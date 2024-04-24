import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbUpdateOrderRepository } from '@/core/domain/protocols/db/order/update-order-repository';
import { Order } from '@/core/domain/models/order.entity';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { UpdateOrderDto } from '@/presentation/dtos/order/update-order.dto';
import { OrderModel } from '@/presentation/dtos/order/order-model.dto';

@Injectable()
export class DbUpdateOrder implements IDbUpdateOrderRepository {
  constructor(private readonly orderRepository: OrderRepository) {}

  async update(payload: UpdateOrderDto, id: string): Promise<OrderModel> {
    try {
      return await this.orderRepository.update(payload, id);
    } catch (error) {
      if (error.message === 'Order not found') {
        throw new BadRequestException(`Order not found`);
      } else {
        throw error;
      }
    }
  }
}
