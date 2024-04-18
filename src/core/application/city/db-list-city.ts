import { IDbListCityRepository } from '@/core/domain/protocols/db/city/list-city-respository';
import { Injectable } from '@nestjs/common';
import { City } from '@/core/domain/models/city.entity';
import { CityRepository } from '@/core/domain/protocols/db/repositories/city';

@Injectable()
export class DbListCity implements IDbListCityRepository {
  constructor(private readonly cityRepository: CityRepository) {}

  async getAll(): Promise<City[]> {
    return await this.cityRepository.getAll();
  }
}
