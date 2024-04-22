import { Repository } from 'typeorm';
import { Address } from '@/core/domain/models/address.entity';
import { AddressRepository } from '@/core/domain/protocols/repositories/address';
import { UploadAddressDto } from '@/presentation/dtos/address/upload-address.dto';
import { AddAddressDto } from '@/presentation/dtos/address/add-address.dto';

export class AddressTypeOrmRepository implements AddressRepository {
  constructor(private readonly addressRepository: Repository<Address>) {}
  async update(payload: UploadAddressDto, id: string): Promise<Address> {
    try {
      const address = await this.addressRepository.findOneOrFail({
        where: { id },
      });

      this.addressRepository.merge(address, payload);
      return this.addressRepository.save(address);
    } catch (error) {
      throw new Error('Address not found');
    }
  }

  async findById(id: string): Promise<Address> {
    return this.addressRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.addressRepository.delete(id);
  }

  async getAll(): Promise<Address[]> {
    return this.addressRepository.find({
      relations: ['city'],
    });
  }

  async create(payload: AddAddressDto): Promise<Address> {
    const address = this.addressRepository.create(payload);
    return this.addressRepository.save(address);
  }
}
