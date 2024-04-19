import { Repository } from 'typeorm';
import { Address } from '@/core/domain/models/address.entity';
import { AddressRepository } from '@/core/domain/protocols/db/repositories/address';
import { AddressModelDto } from '@/presentation/dtos/address/address-model.dto';

export class AddressTypeOrmRepository implements AddressRepository {
  constructor(private readonly AddressRepository: Repository<Address>) {}
  async update(
    payload: Omit<AddressModelDto, 'id'>,
    id: string,
  ): Promise<Address> {
    try {
      const Address = await this.AddressRepository.findOneOrFail({
        where: { id },
      });

      this.AddressRepository.merge(Address, payload);
      return this.AddressRepository.save(Address);
    } catch (error) {
      throw new Error('Address not found');
    }
  }

  async findById(id: string): Promise<Address> {
    return this.AddressRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.AddressRepository.delete(id);
  }

  async getAll(): Promise<Address[]> {
    return this.AddressRepository.find({
      relations: ['city'],
    });
  }

  async create(payload: Omit<Address, 'id'>): Promise<Address> {
    const address = this.AddressRepository.create(payload);
    return this.AddressRepository.save(address);
  }
}
