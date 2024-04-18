import { Provider } from '@nestjs/common';
import { StateTypeOrmRepository } from '../../db/typeorm/repositories/state-typeorm.repository';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { IDbDeleteStateRepository } from '@/core/domain/protocols/db/state/delete-state-repository';
import { StateRepository } from '@/core/domain/protocols/db/repositories/state';
import { IDbAddStateRepository } from '@/core/domain/protocols/db/state/add-state-repository';
import { IDbListStateRepository } from '@/core/domain/protocols/db/state/list-state-respository';
import { IDbUpdateStateRepository } from '@/core/domain/protocols/db/state/update-state-repository';
import { State } from '@/core/domain/models/state.entity';
import { DbListState } from '@/core/application/state/db-list-state';
import { DbDeleteState } from '@/core/application/state/db-delete-state';
import { DbUpdateState } from '@/core/application/state/db-update-state';
import { DbAddState } from '@/core/application/state/db-add-state';

export const stateProvider: Provider[] = [
  DbAddState,
  DbListState,
  DbDeleteState,
  DbUpdateState,
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
    provide: IDbAddStateRepository,
    useClass: DbAddState,
  },
  {
    provide: IDbAddStateRepository,
    useFactory: (stateRepository: StateRepository): DbAddState => {
      return new DbAddState(stateRepository);
    },
    inject: [StateTypeOrmRepository],
  },
  {
    provide: IDbListStateRepository,
    useFactory: (stateRepository: StateRepository): DbListState => {
      return new DbListState(stateRepository);
    },
    inject: [StateTypeOrmRepository],
  },
  {
    provide: IDbUpdateStateRepository,
    useFactory: (stateRepository: StateRepository): DbUpdateState => {
      return new DbUpdateState(stateRepository);
    },
    inject: [StateTypeOrmRepository],
  },
  {
    provide: IDbDeleteStateRepository,
    useFactory: (stateRepository: StateRepository): DbDeleteState => {
      return new DbDeleteState(stateRepository);
    },
    inject: [StateTypeOrmRepository],
  },
];
