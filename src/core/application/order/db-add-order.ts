import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbAddOrderRepository } from '@/core/domain/protocols/db/order/add-order-repository';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';
import { IDbAddOrderItemRepository } from '@/core/domain/protocols/db/order_item/add-order_item-repository';
import {
  CategoryLocallylDto,
  OrderItemLocally,
  OrderModel,
  ProductOrderDto,
  UserOrderDto,
} from '@/presentation/dtos/order/order-model.dto';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { OrderStatusEnum } from '@/shared/enums/order_status.enum';
import { AttributesRepository } from '@/core/domain/protocols/repositories/attributes';

@Injectable()
export class DbAddOrder implements IDbAddOrderRepository {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
    private readonly dbAddOrderItem: IDbAddOrderItemRepository,
    private readonly productRepository: ProductRepository,
    private readonly attributeRepository: AttributesRepository,
  ) {}

  async create(payload: AddOrderDto): Promise<OrderModel> {
    const validUser = await this.userRepository.findById(payload.user_id);
    if (!validUser) {
      throw new BadRequestException(
        `User with ${payload.user_id} id not found`,
      );
    }

    const order = await this.orderRepository.create({
      total: 0,
      user_id: payload.user_id,
      status: OrderStatusEnum.PENDING,
      order_items: [],
    });

    let total = 0;

    const order_items: any[] = [];

    for (const item of payload.order_items) {
      const productAttribute = await this.attributeRepository.findById(
        item.attribute_id,
      );

      if (!productAttribute) {
        throw new BadRequestException(
          `Product for attribute ${item.attribute_id} not found`,
        );
      }
      const productId = productAttribute.product_id;

      const product = await this.productRepository.findById(productId);
      if (!product) {
        throw new BadRequestException(`Product with ${productId} id not found`);
      }

      const sub_total = item.quantity * product.price;

      order_items.push({
        id: productId,
        quantity: item.quantity,
        sub_total,
        product: product,
      });

      total += sub_total;

      await this.dbAddOrderItem.create({
        order_id: order.id,
        product_id: productId,
        quantity: item.quantity,
        sub_total: sub_total,
      });
    }

    order.order_items = order_items;

    const response = await this.orderRepository.update(
      {
        status: order.status,
        total,
      },
      order.id,
    );
    const updatedOrder = OrderModel.toDto(response);

    return {
      ...updatedOrder,
      user: UserOrderDto.toDto(validUser),
      order_items: order.order_items.map((item) => {
        return {
          ...OrderItemLocally.toDto(item),
          product: {
            ...ProductOrderDto.toDto(item.product),
            category: {
              ...CategoryLocallylDto.toDto(item.product.category),
            },
          },
        };
      }),
    };
  }
}
