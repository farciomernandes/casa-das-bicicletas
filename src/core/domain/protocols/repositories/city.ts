import { Injectable } from '@nestjs/common';
import { City } from '@/core/domain/models/city.entity';
import { CityModel } from '@/presentation/dtos/city/city-model.dto';
import { IDbAddCityRepository } from '../db/city/add-city-repository';
import { IDbListCityRepository } from '../db/city/list-city-respository';
import { IDbUpdateCityRepository } from '../db/city/update-city-repository';
import { IDbFindCityByValueRepository } from '../db/city/find-city-by-name-repository';
import { IDbFindCityByIdRepository } from '../db/city/find-city-by-id-repository';
import { IDbDeleteCityRepository } from '../db/city/delete-city-repository';
import { CityParamsDto } from '@/presentation/dtos/city/params-city.dto';

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
  abstract getAll(querryParams?: CityParamsDto): Promise<City[]>;
  abstract create(payload: Omit<CityModel, 'id'>): Promise<City>;
  abstract delete(id: string): Promise<void>;
  abstract update(payload: Omit<CityModel, 'id'>, id: string): Promise<City>;
}
