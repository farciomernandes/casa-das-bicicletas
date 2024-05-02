import { Repository } from 'typeorm';
import { Order } from '@/core/domain/models/order.entity';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { UpdateOrderDto } from '@/presentation/dtos/order/update-order.dto';
import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';
import { OrderModel } from '@/presentation/dtos/order/order-model.dto';

export class OrderTypeOrmRepository implements OrderRepository {
  constructor(private readonly orderRepository: Repository<Order>) {}

  async update(payload: UpdateOrderDto, id: string): Promise<any> {
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
    return await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.order_items', 'order_items')
      .leftJoinAndSelect('order_items.product_variables', 'product_variables')
      .where('order.id = :id', { id })
      .getOne();
  }

  async delete(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }

  async getAll(): Promise<any> {
    const ordersWithItemsAndProducts = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.order_items', 'order_items')
      .leftJoinAndSelect('order_items.product_variables', 'product_variables')
      .getMany();

    return ordersWithItemsAndProducts;
  }

  async create(payload: AddOrderDto, user_id: string): Promise<Order> {
    const order = this.orderRepository.create({ ...payload, user_id });
    return this.orderRepository.save(order);
  }
}
