import { BadRequestException, Injectable } from '@nestjs/common';
import { AddressRepository } from '@/core/domain/protocols/db/repositories/address';
import { IDbDeleteAddressRepository } from '@/core/domain/protocols/db/address/delete-address-repository';

@Injectable()
export class DbDeleteAddress implements IDbDeleteAddressRepository {
  constructor(private readonly addressRepository: AddressRepository) {}

  async delete(id: string): Promise<void> {
    const alreadyExists = await this.addressRepository.findById(id);

    if (!alreadyExists) {
      throw new BadRequestException(`Address not found`);
    }
    await this.addressRepository.delete(id);
  }
}