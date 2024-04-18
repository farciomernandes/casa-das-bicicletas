import { Repository } from 'typeorm';
import { City } from '@/core/domain/models/city.entity';
import { CityRepository } from '@/core/domain/protocols/db/repositories/city';
import { CityModel } from '@/presentation/dtos/city/city-model.dto';

export class CityTypeOrmRepository implements CityRepository {
  constructor(private readonly cityRepository: Repository<City>) {}
  async findByName(name: string): Promise<City> {
    return this.cityRepository.findOne({ where: { name } });
  }

  async update(payload: Omit<CityModel, 'id'>, id: string): Promise<City> {
    try {
      const City = await this.cityRepository.findOneOrFail({
        where: { id },
      });

      this.cityRepository.merge(City, payload);
      return this.cityRepository.save(City);
    } catch (error) {
      throw new Error('City not found');
    }
  }

  async findById(id: string): Promise<City> {
    return this.cityRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.cityRepository.delete(id);
  }

  async getAll(): Promise<City[]> {
    return this.cityRepository.find();
  }

  async create(payload: Omit<City, 'id'>): Promise<City> {
    const City = this.cityRepository.create(payload);
    return this.cityRepository.save(City);
  }
}