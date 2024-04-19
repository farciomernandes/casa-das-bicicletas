import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbAddCityRepository } from '@/core/domain/protocols/db/city/add-city-repository';
import { City } from '@/core/domain/models/city.entity';
import { StateRepository } from '@/core/domain/protocols/repositories/state';
import { CityRepository } from '@/core/domain/protocols/repositories/city';

@Injectable()
export class DbAddCity implements IDbAddCityRepository {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly stateRepository: StateRepository,
  ) {}

  async create(payload: Omit<City, 'id'>): Promise<City> {
    const alreadyExists = await this.cityRepository.findByName(payload.name);

    if (alreadyExists) {
      throw new BadRequestException(
        `Already exists a city with ${payload.name} name.`,
      );
    }
    const validState = await this.stateRepository.findById(payload.state_id);

    if (!validState) {
      throw new BadRequestException(`State ${payload.state_id} not found`);
    }
    return await this.cityRepository.create(payload);
  }
}
