import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IDbAddShippingRepository } from '@/core/domain/protocols/db/shipping/add-shipping-repository';
import { ShippingRepository } from '@/core/domain/protocols/repositories/shipping';
import { AddShippingDto } from '@/presentation/dtos/shipping/add-shipping.dto';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { ShippingModelDto } from '@/presentation/dtos/shipping/shipping-model.dto';

@Injectable()
export class DbAddShipping implements IDbAddShippingRepository {
  constructor(
    private readonly shippingRepository: ShippingRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async create(payload: AddShippingDto): Promise<ShippingModelDto> {
    try {
      const orderAlreadyExists = await this.orderRepository.findById(
        payload.order_id,
      );

      if (!orderAlreadyExists) {
        throw new BadRequestException(
          `Order with ${payload.order_id} id does not exists`,
        );
      }

      const shipping = await this.shippingRepository.create({
        ...payload,
      });

      await this.orderRepository.update(
        {
          ...orderAlreadyExists,
          shippings_id: shipping.id,
          total: orderAlreadyExists.total + shipping.price,
        },
        orderAlreadyExists.id,
      );

      return shipping;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
