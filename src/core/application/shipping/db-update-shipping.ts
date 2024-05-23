import { BadRequestException, Injectable } from '@nestjs/common';

import { IDbUpdateShippingRepository } from '@/core/domain/protocols/db/shipping/update-shipping-repository';
import { ShippingRepository } from '@/core/domain/protocols/repositories/shipping';
import { UpdateShippingDto } from '@/presentation/dtos/shipping/update-shipping.dto';
import { Shipping } from '@/core/domain/models/shipping.entity';

@Injectable()
export class DbUpdateShipping implements IDbUpdateShippingRepository {
  constructor(private readonly shippingRepository: ShippingRepository) {}

  async update(payload: UpdateShippingDto, id: string): Promise<Shipping> {
    try {
      const alreadyExists = await this.shippingRepository.findById(id);

      if (!alreadyExists) {
        throw new BadRequestException(`Shipping with ${id} id not found.`);
      }

      return await this.shippingRepository.update(payload, id);
    } catch (error) {
      if (error.message === 'Shipping not found') {
        throw new BadRequestException(`Shipping not found`);
      } else {
        throw error;
      }
    }
  }
}
