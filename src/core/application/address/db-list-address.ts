import { IDbListAddressRepository } from '@/core/domain/protocols/db/address/list-address-respository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AddressRepository } from '@/core/domain/protocols/repositories/address';
import { AddressModelDto } from '@/presentation/dtos/address/address-model.dto';
import { CityModel } from '@/presentation/dtos/city/city-model.dto';

@Injectable()
export class DbListAddress implements IDbListAddressRepository {
  constructor(private readonly addressRepository: AddressRepository) {}

  async getAll(): Promise<AddressModelDto[]> {
    try {
      const addresses = await this.addressRepository.getAll();

      return addresses.map((address) => {
        return {
          ...AddressModelDto.toDto(address),
          city: CityModel.toDto(address.city),
        };
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
