import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import {
  OrderItemLocally,
  OrderModel,
  UserOrderDto,
} from '@/presentation/dtos/order/order-model.dto';
import { ProductVariablesModel } from '@/presentation/dtos/product_variable/product_variables-model.dto';
import { Authenticated } from '@/presentation/dtos/auth/authenticated.dto';
import { RolesEnum } from '@/shared/enums/roles.enum';
@Injectable()
export class DbListOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getAll(user: Authenticated): Promise<OrderModel[]> {
    try {
      let orders;

      if (user.roles.value == RolesEnum.ADMIN) {
        orders = await this.orderRepository.getAll(user);
      } else {
        orders = await this.orderRepository.getAll();
      }

      return orders.map((order) => {
        return {
          ...OrderModel.toDto(order),
          user: UserOrderDto.toDto(order.user),
          order_items: order.order_items.map((item) => {
            return {
              ...OrderItemLocally.toDto(item),
              product_variables: ProductVariablesModel.toDto(
                item.product_variables,
              ),
            };
          }),
        };
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
