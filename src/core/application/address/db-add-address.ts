import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbAddAddressRepository } from '@/core/domain/protocols/db/address/add-address-repository';
import { Address } from '@/core/domain/models/address.entity';
import { AddressRepository } from '@/core/domain/protocols/repositories/address';
import { CityRepository } from '@/core/domain/protocols/repositories/city';

@Injectable()
export class DbAddAddress implements IDbAddAddressRepository {
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly cityRepository: CityRepository,
  ) {}

  async create(payload: Omit<Address, 'id'>): Promise<Address> {
    const validCity = await this.cityRepository.findById(payload.city_id);

    if (!validCity) {
      throw new BadRequestException(`City ${payload.city_id} not found`);
    }
    return await this.addressRepository.create(payload);
  }
}
