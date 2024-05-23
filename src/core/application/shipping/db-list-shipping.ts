import { IDbListShippingRepository } from '@/core/domain/protocols/db/shipping/list-shipping-respository';
import { ShippingRepository } from '@/core/domain/protocols/repositories/shipping';
import { ShippingModelDto } from '@/presentation/dtos/shipping/shipping-model.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class DbListShipping implements IDbListShippingRepository {
  constructor(private readonly shippingRepository: ShippingRepository) {}

  async getAll(): Promise<ShippingModelDto[]> {
    try {
      return await this.shippingRepository.getAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
