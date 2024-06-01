import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { IShippingCalculate } from '@/core/domain/protocols/shipping/IShippingCalculate';
import { ShippingOptionDto } from '@/presentation/dtos/shipping/shipping-calculate.dto';
import { IShippingService } from '@/core/domain/protocols/melhor-envio/melhor-envio-service';

@Injectable()
export class ShippingCalculate implements IShippingCalculate {
  constructor(
    private readonly shippingService: IShippingService,
    private readonly orderRepository: OrderRepository,
  ) {}

  async calculateShipping(
    order_id: string,
    to_postal_code: string,
  ): Promise<ShippingOptionDto[]> {
    try {
      const order = await this.orderRepository.findById(order_id);

      if (!order) {
        throw new BadRequestException(
          `Order with ${order_id} id does not exists`,
        );
      }

      return await this.shippingService.calculateShipping(
        order,
        to_postal_code,
      );
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
