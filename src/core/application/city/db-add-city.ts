import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbAddCityRepository } from '@/core/domain/protocols/db/city/add-city-repository';
import { City } from '@/core/domain/models/city.entity';
import { CityRepository } from '@/core/domain/protocols/db/repositories/city';

@Injectable()
export class DbAddCity implements IDbAddCityRepository {
  constructor(private readonly cityRepository: CityRepository) {}

  async create(payload: Omit<City, 'id'>): Promise<City> {
    const alreadyExists = await this.cityRepository.findByName(payload.name);

    if (alreadyExists && alreadyExists.id) {
      throw new BadRequestException(
        `Already exists a city with ${payload.name} name.`,
      );
    }
    const city = await this.cityRepository.create(payload);

    return city;
  }
}
