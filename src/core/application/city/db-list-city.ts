import { IDbListCityRepository } from '@/core/domain/protocols/db/city/list-city-respository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CityRepository } from '@/core/domain/protocols/repositories/city';
import { CityListDto } from '@/presentation/dtos/city/city-model.dto';

@Injectable()
export class DbListCity implements IDbListCityRepository {
  constructor(private readonly cityRepository: CityRepository) {}

  async getAll(): Promise<CityListDto> {
    try {
      return await this.cityRepository.getAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
