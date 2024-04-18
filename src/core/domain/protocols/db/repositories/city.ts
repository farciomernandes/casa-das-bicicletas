import { Injectable } from '@nestjs/common';
import { IDbListCityRepository } from '../city/list-city-respository';
import { IDbAddCityRepository } from '../city/add-city-repository';
import { City } from '@/core/domain/models/city.entity';
import { IDbDeleteCityRepository } from '../city/delete-city-repository';
import { CityModel } from '@/presentation/dtos/city/city-model.dto';
import { IDbUpdateCityRepository } from '../city/update-city-repository';
import { IDbFindCityByValueRepository } from '../city/find-city-by-name-repository';
import { IDbFindCityByIdRepository } from '../city/find-city-by-id-repository';

@Injectable()
export abstract class CityRepository
  implements
    IDbAddCityRepository,
    IDbListCityRepository,
    IDbUpdateCityRepository,
    IDbFindCityByValueRepository,
    IDbFindCityByIdRepository,
    IDbDeleteCityRepository
{
  abstract findById(id: string): Promise<City>;
  abstract findByName(name: string): Promise<City>;
  abstract getAll(): Promise<City[]>;
  abstract create(payload: Omit<CityModel, 'id'>): Promise<City>;
  abstract delete(id: string): Promise<void>;
  abstract update(payload: Omit<CityModel, 'id'>, id: string): Promise<City>;
}
