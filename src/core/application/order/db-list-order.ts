import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import {
  OrderItemLocally,
  OrderModel,
  UserOrderDto,
} from '@/presentation/dtos/order/order-model.dto';
import { ProductModelDto } from '@/presentation/dtos/product/product-model.dto';
@Injectable()
export class DbListOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getAll(): Promise<any> {
    try {
      return await this.orderRepository.getAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
