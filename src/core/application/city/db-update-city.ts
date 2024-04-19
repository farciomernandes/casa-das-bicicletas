import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbUpdateCityRepository } from '@/core/domain/protocols/db/city/update-city-repository';
import { CityModel } from '@/presentation/dtos/city/city-model.dto';
import { City } from '@/core/domain/models/city.entity';
import { CityRepository } from '@/core/domain/protocols/repositories/city';

@Injectable()
export class DbUpdateCity implements IDbUpdateCityRepository {
  constructor(private readonly cityRepository: CityRepository) {}

  async update(payload: Omit<CityModel, 'id'>, id: string): Promise<City> {
    try {
      return await this.cityRepository.update(payload, id);
    } catch (error) {
      if (error.message === 'City not found') {
        throw new BadRequestException(`City not found`);
      } else {
        throw error;
      }
    }
  }
}
