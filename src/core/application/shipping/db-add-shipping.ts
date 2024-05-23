import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IDbAddShippingRepository } from '@/core/domain/protocols/db/shipping/add-shipping-repository';
import { ShippingRepository } from '@/core/domain/protocols/repositories/shipping';
import { AddShippingDto } from '@/presentation/dtos/shipping/add-shipping.dto';
import { Shipping } from '@/core/domain/models/shipping.entity';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';

@Injectable()
export class DbAddShipping implements IDbAddShippingRepository {
  constructor(
    private readonly shippingRepository: ShippingRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async create(payload: AddShippingDto): Promise<Shipping> {
    try {
      const orderAlreadyExists = await this.orderRepository.findById(
        payload.order_id,
      );

      if (!orderAlreadyExists) {
        throw new BadRequestException(
          `Order with ${payload.order_id} id does not exists`,
        );
      }

      return await this.shippingRepository.create({
        ...payload,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
