import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import {
  OrderItemLocally,
  OrderModel,
  UserOrderDto,
} from '@/presentation/dtos/order/order-model.dto';
import { ProductVariablesModel } from '@/presentation/dtos/product_variable/product_variables-model.dto';
import { IDbFindOrderByIdRepository } from '@/core/domain/protocols/db/order/find-order-by-id-repository';
@Injectable()
export class DbFindOrderById implements IDbFindOrderByIdRepository {
  constructor(private readonly orderRepository: OrderRepository) {}
  async findById(id: string): Promise<OrderModel> {
    try {
      const order = await this.orderRepository.findById(id);
      if (order == null) {
        throw new BadRequestException(`Order with ${id} id not found!`);
      }

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
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
