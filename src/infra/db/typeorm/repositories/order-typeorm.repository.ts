import { EntityManager, Repository } from 'typeorm';
import { Order } from '@/core/domain/models/order.entity';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { UpdateOrderDto } from '@/presentation/dtos/order/update-order.dto';
import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';
import { Authenticated } from '@/presentation/dtos/auth/authenticated.dto';
import {
  GetAllOrdersDto,
  OrderModelDto,
  OrderParamsDto,
} from '@/presentation/dtos/order/order-model.dto';
import { InternalServerErrorException } from '@nestjs/common';

export class OrderTypeOrmRepository implements OrderRepository {
  constructor(private readonly orderRepository: Repository<Order>) {}
  async createTransactionMode(
    payload: AddOrderDto,
    user_id: string,
    entityManager: EntityManager,
  ) {
    try {
      const repository = entityManager
        ? entityManager.getRepository(Order)
        : this.orderRepository;

      const order = repository.create({
        ...payload,
        user_id,
      });

      const orderSaved = await repository.save(order);

      return orderSaved;
    } catch (error) {
      console.log(error);
    }
  }

  async update(
    payload: UpdateOrderDto,
    id: string,
    entityManager?: EntityManager,
  ): Promise<OrderModelDto> {
    try {
      const repository = entityManager
        ? entityManager.getRepository(Order)
        : this.orderRepository;

      console.log('veio -> ', entityManager);
      console.log('repository -> ', repository);

      const order = await repository.findOneOrFail({
        where: { id },
      });

      await repository.merge(order, payload);
      await repository.save(order);
      const response = await this.findById(id);
      return OrderModelDto.toDto(response);
    } catch (error) {
      throw new Error('Order not found');
    }
  }

  async findById(id: string): Promise<OrderModelDto> {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.address', 'addresses')
      .leftJoinAndSelect('order.order_items', 'order_items')
      .leftJoinAndSelect('order_items.product_variables', 'product_variables')
      .leftJoinAndSelect('order.shippings', 'shippings')
      .where('order.id = :id', { id })
      .getOne();

    return OrderModelDto.toDto(order);
  }

  async findByIdToTransaction(id: string): Promise<OrderModelDto | Order> {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.address', 'addresses')
      .leftJoinAndSelect('order.order_items', 'order_items')
      .leftJoinAndSelect('order_items.product_variables', 'product_variables')
      .leftJoinAndSelect('order.shippings', 'shippings')
      .where('order.id = :id', { id })
      .getOne();

    if (!order) {
      return null;
    }

    return OrderModelDto.toDto(order);
  }

  async delete(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }

  async getAll(
    params: OrderParamsDto,
    user?: Authenticated,
  ): Promise<GetAllOrdersDto> {
    let queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.address', 'addresses')
      .leftJoinAndSelect('order.order_items', 'order_items')
      .leftJoinAndSelect('order_items.product_variables', 'product_variables')
      .leftJoinAndSelect('product_variables.product', 'product')
      .leftJoinAndSelect('addresses.city', 'city')
      .leftJoinAndSelect('order.shippings', 'shippings');

    if (user) {
      queryBuilder = queryBuilder.where('order.user_id = :userId', {
        userId: user.id,
      });
    }

    if (params.id) {
      queryBuilder = queryBuilder.andWhere('order.id = :id', {
        id: params.id,
      });
    }

    if (params.status) {
      queryBuilder = queryBuilder.andWhere('order.status = :status', {
        status: params.status,
      });
    }

    if (params.name) {
      queryBuilder = queryBuilder.andWhere('user.name ILIKE :name', {
        name: `%${params.name}%`,
      });
    }

    const total = await queryBuilder.getCount();

    const totalPages = Math.ceil(total / params.limit);

    const ordersWithItemsAndProducts = await queryBuilder
      .take(params.limit)
      .skip((params.page - 1) * params.limit)
      .getMany();

    const orders = ordersWithItemsAndProducts.map((order) =>
      OrderModelDto.toDto(order),
    );

    return { orders, pages: totalPages, total };
  }

  async create(payload: AddOrderDto, user_id: string): Promise<OrderModelDto> {
    try {
      const order = this.orderRepository.create({
        ...payload,
        user_id,
      });
      const orderSaved = await this.orderRepository.save(order);

      return OrderModelDto.toDto(await this.findById(orderSaved.id));
    } catch (error) {
      console.log(error);
    }
  }

  async updateTransactionMode(
    payload: UpdateOrderDto,
    id: string,
    entityManager?: EntityManager,
  ): Promise<any> {
    try {
      const repository = entityManager.getRepository(Order);

      const order = await repository.findOneOrFail({
        where: { id },
      });

      await repository.merge(order, payload);

      await repository.save(order);

      const response = await this.findByIdToTransaction(id);
      if (!response) {
        return order;
      }

      return OrderModelDto.toDto(response);
    } catch (error) {
      throw new InternalServerErrorException('Order not found');
    }
  }
}
