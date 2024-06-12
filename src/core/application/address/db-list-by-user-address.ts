import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AddressRepository } from '@/core/domain/protocols/repositories/address';
import { AddressModelDto } from '@/presentation/dtos/address/address-model.dto';
import { CityModel } from '@/presentation/dtos/city/city-model.dto';
import { IDbListByUserAddressRepository } from '@/core/domain/protocols/db/address/list-by-user-address-respository';

@Injectable()
export class DbListByUserAddress implements IDbListByUserAddressRepository {
  constructor(private readonly addressRepository: AddressRepository) {}

  async getByUser(user_id:string): Promise<AddressModelDto[]> {
    try {
      const addresses = await this.addressRepository.getByUser(user_id);

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
