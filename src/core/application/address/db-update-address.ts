import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbUpdateAddressRepository } from '@/core/domain/protocols/db/address/update-address-repository';
import { Address } from '@/core/domain/models/address.entity';
import { AddressRepository } from '@/core/domain/protocols/repositories/address';
import { UploadAddressDto } from '@/presentation/dtos/address/upload-address.dto';

@Injectable()
export class DbUpdateAddress implements IDbUpdateAddressRepository {
  constructor(private readonly addressRepository: AddressRepository) {}

  async update(payload: UploadAddressDto, id: string): Promise<Address> {
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
