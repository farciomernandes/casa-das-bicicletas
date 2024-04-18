import { BadRequestException, Injectable } from '@nestjs/common';
import { CityRepository } from '@/core/domain/protocols/db/repositories/city';
import { IDbUpdateCityRepository } from '@/core/domain/protocols/db/city/update-city-repository';
import { CityModel } from '@/presentation/dtos/city/city-model.dto';
import { City } from '@/core/domain/models/city.entity';

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
