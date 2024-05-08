import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IDbAddAddressRepository } from '@/core/domain/protocols/db/address/add-address-repository';
import { AddressRepository } from '@/core/domain/protocols/repositories/address';
import { CityRepository } from '@/core/domain/protocols/repositories/city';
import { AddAddressDto } from '@/presentation/dtos/address/add-address.dto';
import { AddressModelDto } from '@/presentation/dtos/address/address-model.dto';

@Injectable()
export class DbAddAddress implements IDbAddAddressRepository {
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly cityRepository: CityRepository,
  ) {}

  async create(
    payload: Omit<AddAddressDto, 'id'>,
    user_id: string,
  ): Promise<AddressModelDto> {
    try {
      const validCity = await this.cityRepository.findById(payload.city_id);

      if (!validCity) {
        throw new BadRequestException(`City ${payload.city_id} not found`);
      }

      const created = await this.addressRepository.create(payload, user_id);
      const response = await this.addressRepository.findById(created.id);

      return AddressModelDto.toDto(response);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
