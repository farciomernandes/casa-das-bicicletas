import { BadRequestException, Injectable } from '@nestjs/common';
import { AddressRepository } from '@/core/domain/protocols/db/repositories/address';
import { IDbUpdateAddressRepository } from '@/core/domain/protocols/db/address/update-address-repository';
import { AddressModelDto } from '@/presentation/dtos/address/address-model.dto';
import { Address } from '@/core/domain/models/address.entity';

@Injectable()
export class DbUpdateAddress implements IDbUpdateAddressRepository {
  constructor(private readonly addressRepository: AddressRepository) {}

  async update(
    payload: Omit<AddressModelDto, 'id'>,
    id: string,
  ): Promise<Address> {
    try {
      return await this.addressRepository.update(payload, id);
    } catch (error) {
      if (error.message === 'Address not found') {
        throw new BadRequestException(`Address not found`);
      } else {
        throw error;
      }
    }
  }
}
