import { IDbListAddressRepository } from '@/core/domain/protocols/db/address/list-address-respository';
import { Injectable } from '@nestjs/common';
import { Address } from '@/core/domain/models/address.entity';
import { AddressRepository } from '@/core/domain/protocols/repositories/address';

@Injectable()
export class DbListAddress implements IDbListAddressRepository {
  constructor(private readonly addressRepository: AddressRepository) {}

  async getAll(): Promise<Address[]> {
    return await this.addressRepository.getAll();
  }
}
