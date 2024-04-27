import { IDbListCityRepository } from '@/core/domain/protocols/db/city/list-city-respository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { City } from '@/core/domain/models/city.entity';
import { CityRepository } from '@/core/domain/protocols/repositories/city';

@Injectable()
export class DbListCity implements IDbListCityRepository {
  constructor(private readonly cityRepository: CityRepository) {}

  async getAll(): Promise<City[]> {
    try {
      return await this.cityRepository.getAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
