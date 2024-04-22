import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbAddOrderItemRepository } from '@/core/domain/protocols/db/order_item/add-order_item-repository';
import { OrderItem } from '@/core/domain/models/order_item.entity';
import { OrderItemRepository } from '@/core/domain/protocols/repositories/order_item';
import { AddOrderItemDto } from '@/presentation/dtos/order_item/add-order_item.dto';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';

@Injectable()
export class DbAddOrderItem implements IDbAddOrderItemRepository {
  constructor(
    private readonly orderItemRepository: OrderItemRepository,
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async create(payload: AddOrderItemDto): Promise<OrderItem> {
    const product = await this.productRepository.findById(payload.product_id);

    if (product) {
      throw new BadRequestException(
        `Product with ${payload.product_id} id not found.`,
      );
    }
    const order = await this.orderRepository.findById(payload.order_id);

    if (order) {
      throw new BadRequestException(
        `Order with ${payload.order_id} id not found.`,
      );
    }

    return await this.orderItemRepository.create(payload);
  }
}
