import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbAddOrderRepository } from '@/core/domain/protocols/db/order/add-order-repository';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';
import { IDbAddOrderItemRepository } from '@/core/domain/protocols/db/order_item/add-order_item-repository';
import {
  OrderItemLocally,
  OrderModel,
  ProductOrderDto,
  UserOrderDto,
} from '@/presentation/dtos/order/order-model.dto';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { OrderStatusEnum } from '@/shared/enums/order_status.enum';

@Injectable()
export class DbAddOrder implements IDbAddOrderRepository {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
    private readonly dbAddOrderItem: IDbAddOrderItemRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async create(payload: AddOrderDto): Promise<OrderModel> {
    const validUser = await this.userRepository.findById(payload.user_id);

    if (!validUser) {
      throw new BadRequestException(
        `User with ${payload.user_id} id not found`,
      );
    }

    const total = payload.order_items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    );

    const order = await this.orderRepository.create({
      total,
      user_id: payload.user_id,
      status: OrderStatusEnum.PENDING,
      order_items: [],
    });

    const order_items: any[] = [];

    for (const item of payload.order_items) {
      const product = await this.productRepository.findById(item.product.id);
      if (!product) {
        throw new BadRequestException(
          `Product ${item.product.name} does not exist`,
        );
      }

      const sub_total = item.quantity * product.price;

      order_items.push({
        id: item.product.id,
        quantity: item.quantity,
        sub_total,
        product: item.product,
      });

      await this.dbAddOrderItem.create({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        sub_total: sub_total,
      });
    }

    order.order_items = order_items;
    const response = OrderModel.toDto(order);

    return {
      ...response,
      user: UserOrderDto.toDto(validUser),
      order_items: response.order_items.map((item) => {
        return {
          ...OrderItemLocally.toDto(item),
          product: ProductOrderDto.toDto(item.product),
        };
      }),
    };
  }
}
