import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import {
  OrderItemLocally,
  OrderModel,
  ProductOrderDto,
  UserOrderDto,
} from '@/presentation/dtos/order/order-model.dto';
import { ProductVariables } from '@/core/domain/models/product_variables.entity';
import { ProductVariablesModel } from '@/presentation/dtos/product_variable/product_variables-model.dto';
@Injectable()
export class DbListOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getAll(): Promise<OrderModel[]> {
    try {
      const orders = await this.orderRepository.getAll();
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
