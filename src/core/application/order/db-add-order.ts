import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbAddOrderRepository } from '@/core/domain/protocols/db/order/add-order-repository';
import { Order } from '@/core/domain/models/order.entity';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';

@Injectable()
export class DbAddOrder implements IDbAddOrderRepository {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(payload: AddOrderDto): Promise<Order> {
    const validUser = await this.userRepository.findById(payload.user_id);

    if (!validUser) {
      throw new BadRequestException(
        `User with ${payload.user_id} id not found`,
      );
    }
    return await this.orderRepository.create(payload);
  }
}
