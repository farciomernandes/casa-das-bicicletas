import { Repository } from 'typeorm';
import { Order } from '@/core/domain/models/order.entity';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { UpdateOrderDto } from '@/presentation/dtos/order/update-order.dto';
import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';

export class OrderTypeOrmRepository implements OrderRepository {
  constructor(private readonly orderRepository: Repository<Order>) {}

  async update(payload: UpdateOrderDto, id: string): Promise<Order> {
    try {
      const order = await this.orderRepository.findOneOrFail({
        where: { id },
      });

      this.orderRepository.merge(order, payload);
      return this.orderRepository.save(order);
    } catch (error) {
      throw new Error('Order not found');
    }
  }

  async findById(id: string): Promise<Order> {
    return this.orderRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }

  async getAll(): Promise<Order[]> {
    const ordersWithItems = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.order_items', 'order_items')
      .getMany();

    return ordersWithItems;
  }

  async create(payload: AddOrderDto): Promise<Order> {
    const order = this.orderRepository.create(payload);
    return this.orderRepository.save(order);
  }
}
