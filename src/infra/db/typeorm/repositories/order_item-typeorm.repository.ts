import { Repository } from 'typeorm';
import { OrderItem } from '@/core/domain/models/order_item.entity';
import { OrderItemRepository } from '@/core/domain/protocols/repositories/order_item';
import { UpdateOrderItemDto } from '@/presentation/dtos/order_item/update-order_item.dto';
import { AddOrderItemDto } from '@/presentation/dtos/order_item/add-order_item.dto';
import { OrderItemDto } from '@/presentation/dtos/order_item/order_item-model.dto';

export class OrderItemTypeOrmRepository implements OrderItemRepository {
  constructor(private readonly orderItemRepository: Repository<OrderItem>) {}

  async update(payload: UpdateOrderItemDto, id: string): Promise<OrderItem> {
    try {
      const orderItem = await this.orderItemRepository.findOneOrFail({
        where: { id },
        relations: ['product'],
      });

      // -> orderItem.product.price

      const sub_total = payload.quantity * 3;

      this.orderItemRepository.merge(orderItem, {
        ...payload,
        sub_total,
      });
      return this.orderItemRepository.save(orderItem);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: string): Promise<OrderItem> {
    return this.orderItemRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.orderItemRepository.delete(id);
  }

  async getAll(): Promise<OrderItemDto[]> {
    const orderItems = await this.orderItemRepository.find({
      relations: ['order', 'product'],
    });

    return orderItems.map((order) => OrderItemDto.toDto(order));
  }

  async create(payload: AddOrderItemDto): Promise<OrderItemDto> {
    const orderItem = this.orderItemRepository.create(payload);
    const order = this.orderItemRepository.save(orderItem);
    return OrderItemDto.toDto(order);
  }
}
