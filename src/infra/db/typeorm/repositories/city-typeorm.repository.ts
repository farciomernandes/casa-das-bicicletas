import { Repository } from 'typeorm';
import { City } from '@/core/domain/models/city.entity';
import { CityModel } from '@/presentation/dtos/city/city-model.dto';
import { CityRepository } from '@/core/domain/protocols/repositories/city';
import { CityParamsDto } from '@/presentation/dtos/city/params-city.dto';

export class CityTypeOrmRepository implements CityRepository {
  constructor(private readonly cityRepository: Repository<City>) {}
  async findByName(name: string): Promise<City> {
    return this.cityRepository.findOne({ where: { name } });
  }

  async update(payload: Omit<CityModel, 'id'>, id: string): Promise<City> {
    try {
      const city = await this.cityRepository.findOneOrFail({
        where: { id },
      });

      this.cityRepository.merge(city, payload);
      return this.cityRepository.save(city);
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

  async getAll(params?: CityParamsDto): Promise<City[]> {
    const queryBuilder = this.cityRepository.createQueryBuilder('city');

    if (params.id) {
      queryBuilder.andWhere('city.id = :id', { id: params.id });
    }

    if (params.name) {
      queryBuilder.andWhere('city.name LIKE :name', {
        name: `%${params.name}%`,
      });
    }

    if (params.state_id) {
      queryBuilder.andWhere('city.state_id = :stateId', {
        stateId: params.state_id,
      });
    }

    queryBuilder.leftJoinAndSelect('city.state', 'state');

    const cities = await queryBuilder.getMany();
    return cities;
  }

  async create(payload: Omit<City, 'id'>): Promise<City> {
    const city = this.cityRepository.create(payload);
    return this.cityRepository.save(city);
  }
}
