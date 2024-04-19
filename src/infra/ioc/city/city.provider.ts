import { Provider } from '@nestjs/common';
import { DbAddCity } from '@/core/application/city/db-add-city';
import { CityTypeOrmRepository } from '../../db/typeorm/repositories/city-typeorm.repository';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { IDbDeleteCityRepository } from '@/core/domain/protocols/db/city/delete-city-repository';
import { IDbAddCityRepository } from '@/core/domain/protocols/db/city/add-city-repository';
import { IDbListCityRepository } from '@/core/domain/protocols/db/city/list-city-respository';
import { IDbUpdateCityRepository } from '@/core/domain/protocols/db/city/update-city-repository';
import { DbListCity } from '@/core/application/city/db-list-city';
import { DbDeleteCity } from '@/core/application/city/db-delete-city';
import { DbUpdateCity } from '@/core/application/city/db-update-city';
import { City } from '@/core/domain/models/city.entity';
import { StateTypeOrmRepository } from '@/infra/db/typeorm/repositories/state-typeorm.repository';
import { State } from '@/core/domain/models/state.entity';
import { CityRepository } from '@/core/domain/protocols/repositories/city';
import { StateRepository } from '@/core/domain/protocols/repositories/state';

export const cityProvider: Provider[] = [
  DbAddCity,
  DbListCity,
  DbDeleteCity,
  DbUpdateCity,
  {
    provide: CityTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new CityTypeOrmRepository(dataSource.getRepository(City));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: CityRepository,
    useClass: CityTypeOrmRepository,
  },
  {
    provide: StateTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new StateTypeOrmRepository(dataSource.getRepository(State));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: StateRepository,
    useClass: StateTypeOrmRepository,
  },
  {
    provide: IDbAddCityRepository,
    useFactory: (
      cityRepository: CityRepository,
      stateRepository: StateRepository,
    ): DbAddCity => {
      return new DbAddCity(cityRepository, stateRepository);
    },
    inject: [CityTypeOrmRepository, StateTypeOrmRepository],
  },
  {
    provide: IDbListCityRepository,
    useFactory: (cityRepository: CityRepository): DbListCity => {
      return new DbListCity(cityRepository);
    },
    inject: [CityTypeOrmRepository],
  },
  {
    provide: IDbUpdateCityRepository,
    useFactory: (cityRepository: CityRepository): DbUpdateCity => {
      return new DbUpdateCity(cityRepository);
    },
    inject: [CityTypeOrmRepository],
  },
  {
    provide: IDbDeleteCityRepository,
    useFactory: (cityRepository: CityRepository): DbDeleteCity => {
      return new DbDeleteCity(cityRepository);
    },
    inject: [CityTypeOrmRepository],
  },
];
