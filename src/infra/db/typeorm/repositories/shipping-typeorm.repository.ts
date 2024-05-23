import { Shipping } from '@/core/domain/models/shipping.entity';
import { ShippingRepository } from '@/core/domain/protocols/repositories/shipping';
import { AddShippingDto } from '@/presentation/dtos/shipping/add-shipping.dto';
import { ShippingModelDto } from '@/presentation/dtos/shipping/shipping-model.dto';
import { UpdateShippingDto } from '@/presentation/dtos/shipping/update-shipping.dto';
import { Repository } from 'typeorm';

export class ShippingTypeOrmRepository implements ShippingRepository {
  constructor(private readonly shippingRepository: Repository<Shipping>) {}
  async findByName(name: string): Promise<Shipping> {
    return this.shippingRepository.findOne({ where: { name } });
  }
  async update(payload: UpdateShippingDto, id: string): Promise<Shipping> {
    try {
      const shipping = await this.shippingRepository.findOneOrFail({
        where: { id },
      });

      const updateShipping = {
        ...payload,
      };

      this.shippingRepository.merge(
        shipping,
        ShippingModelDto.toDto(updateShipping),
      );
      return this.shippingRepository.save(shipping);
    } catch (error) {
      throw new Error('Error to update Shipping');
    }
  }

  async findById(id: string): Promise<Shipping> {
    return this.shippingRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.shippingRepository.delete(id);
  }

  async getAll(): Promise<Shipping[]> {
    return this.shippingRepository.find();
  }

  async create(payload: AddShippingDto): Promise<Shipping> {
    const shipping = this.shippingRepository.create(payload);
    return this.shippingRepository.save(shipping);
  }
}
