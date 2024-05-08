import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';

import { Authenticated } from '@/presentation/dtos/auth/authenticated.dto';
import { RolesEnum } from '@/shared/enums/roles.enum';
@Injectable()
export class DbListOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getAll(user: Authenticated): Promise<any[]> {
    try {
      let orders;

      if (user.roles.value !== RolesEnum.ADMIN) {
        orders = await this.orderRepository.getAll(user);
      } else {
        orders = await this.orderRepository.getAll();
      }

      return orders;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
