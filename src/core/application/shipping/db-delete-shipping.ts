import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { IDbDeleteShippingRepository } from '@/core/domain/protocols/db/shipping/delete-shipping-repository';
import { ShippingRepository } from '@/core/domain/protocols/repositories/shipping';

@Injectable()
export class DbDeleteShipping implements IDbDeleteShippingRepository {
  constructor(private readonly shippingRepository: ShippingRepository) {}

  async delete(id: string): Promise<void> {
    try {
      const shipping = await this.shippingRepository.findById(id);

      if (!shipping) {
        throw new BadRequestException(`Shipping not found`);
      }

      await this.shippingRepository.delete(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
