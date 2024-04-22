import { Repository } from 'typeorm';
import { OrderItem } from '@/core/domain/models/order_item.entity';
import { OrderItemRepository } from '@/core/domain/protocols/repositories/order_item';
import { UpdateOrderItemDto } from '@/presentation/dtos/order_item/update-order_item.dto';
import { AddOrderItemDto } from '@/presentation/dtos/order_item/add-order_item.dto';

export class OrderItemTypeOrmRepository implements OrderItemRepository {
  constructor(private readonly orderItemRepository: Repository<OrderItem>) {}

  async update(payload: UpdateOrderItemDto, id: string): Promise<OrderItem> {
    try {
      const orderItem = await this.orderItemRepository.findOneOrFail({
        where: { id },
        relations: ['product'],
      });

      const sub_total = payload.quantity * orderItem.product.price;

      this.orderItemRepository.merge(orderItem, {
        ...payload,
        sub_total,
      });
      return this.orderItemRepository.save(orderItem);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findById(id: string): Promise<OrderItem> {
    return this.orderItemRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.orderItemRepository.delete(id);
  }

  async getAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find({
      relations: ['order', 'product'],
    });
  }

  async create(payload: AddOrderItemDto): Promise<OrderItem> {
    const orderItem = this.orderItemRepository.create(payload);
    return this.orderItemRepository.save(orderItem);
  }
}
