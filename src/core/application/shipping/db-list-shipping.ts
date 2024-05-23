import { Shipping } from '@/core/domain/models/shipping.entity';
import { IDbListShippingRepository } from '@/core/domain/protocols/db/shipping/list-shipping-respository';
import { ShippingRepository } from '@/core/domain/protocols/repositories/shipping';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class DbListShipping implements IDbListShippingRepository {
  constructor(private readonly shippingRepository: ShippingRepository) {}

  async getAll(): Promise<Shipping[]> {
    try {
      return await this.shippingRepository.getAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
