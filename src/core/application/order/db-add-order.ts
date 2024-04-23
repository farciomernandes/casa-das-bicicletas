import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbAddOrderRepository } from '@/core/domain/protocols/db/order/add-order-repository';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';
import { IDbAddOrderItemRepository } from '@/core/domain/protocols/db/order_item/add-order_item-repository';
import {
  OrderItemLocally,
  OrderModel,
  UserOrderDto,
} from '@/presentation/dtos/order/order-model.dto';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { OrderStatusEnum } from '@/shared/enums/order_status.enum';

@Injectable()
export class DbAddOrder implements IDbAddOrderRepository {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
    private dbAddOrderItem: IDbAddOrderItemRepository,
    private productRepository: ProductRepository,
  ) {}

  async create(payload: AddOrderDto): Promise<OrderModel> {
    const validUser = await this.userRepository.findById(payload.user_id);

    if (!validUser) {
      throw new BadRequestException(
        `User with ${payload.user_id} id not found`,
      );
    }

    const cartProducts = await Promise.all(
      payload.order_items.map((item) =>
        this.productRepository.findById(item.id),
      ),
    );

    cartProducts.forEach((product, index) => {
      if (!product) {
        throw new BadRequestException(
          `Product ${payload.order_items[index].product.name} does not exist`,
        );
      }
    });

    const order_items = payload.order_items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      sub_total:
        item.quantity * cartProducts.find((p) => p.id === item.id).price,
      product: item.product,
    }));

    const total = order_items.reduce((acc, item) => acc + item.sub_total, 0);

    const order = await this.orderRepository.create({
      total,
      user_id: payload.user_id,
      status: OrderStatusEnum.PENDING,
      order_items,
    });

    await Promise.all(
      payload.order_items.map((item) =>
        this.dbAddOrderItem.create({
          order_id: order.id,
          product_id: item.id,
          quantity: item.quantity,
          sub_total: item.sub_total,
        }),
      ),
    );

    const response = await this.orderRepository.findById(order.id);

    return {
      ...OrderModel.toDto(response),
      user: UserOrderDto.toDto(response.user),
      order_items: response.order_items.map((item) => {
        return OrderItemLocally.toDto(item);
      }),
    };
  }
}
