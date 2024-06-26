import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';

import { Authenticated } from '@/presentation/dtos/auth/authenticated.dto';
import { RolesEnum } from '@/shared/enums/roles.enum';
import {
  GetAllOrdersDto,
  OrderParamsDto,
} from '@/presentation/dtos/order/order-model.dto';
@Injectable()
export class DbListOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getAll(
    params: OrderParamsDto,
    user: Authenticated,
  ): Promise<GetAllOrdersDto> {
    try {
      let response: GetAllOrdersDto;
      if (user.roles.value !== RolesEnum.ADMIN) {
        response = await this.orderRepository.getAll(params, user);
      } else {
        response = await this.orderRepository.getAll(params);
      }

      return {
        orders: response.orders,
        pages: response.pages,
        total: response.total,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
