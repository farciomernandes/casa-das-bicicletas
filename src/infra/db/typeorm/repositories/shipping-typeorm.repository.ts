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
  async update(
    payload: UpdateShippingDto,
    id: string,
  ): Promise<ShippingModelDto> {
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
      return ShippingModelDto.toDto(this.shippingRepository.save(shipping));
    } catch (error) {
      throw new Error('Error to update Shipping');
    }
  }

  async findById(id: string): Promise<ShippingModelDto> {
    return ShippingModelDto.toDto(
      this.shippingRepository.findOne({ where: { id } }),
    );
  }

  async delete(id: string): Promise<void> {
    await this.shippingRepository.delete(id);
  }

  async getAll(): Promise<ShippingModelDto[]> {
    const response = await this.shippingRepository.find();
    return response.map((item) => ShippingModelDto.toDto(item));
  }

  async create(payload: AddShippingDto): Promise<ShippingModelDto> {
    const shipping = this.shippingRepository.create(payload);
    return ShippingModelDto.toDto(this.shippingRepository.save(shipping));
  }
}
