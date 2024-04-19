import { Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { IDbDeleteUserRepository } from '@/core/domain/protocols/db/user/delete-user-repository';
import { IDbAddUserRepository } from '@/core/domain/protocols/db/user/add-user-repository';
import { IDbUpdateUserRepository } from '@/core/domain/protocols/db/user/update-user-repository';
import { DbListUser } from '@/core/application/user/db-list-user';
import { CityTypeOrmRepository } from '@/infra/db/typeorm/repositories/city-typeorm.repository';
import { City } from '@/core/domain/models/city.entity';
import { DbAddUser } from '@/core/application/user/db-add-user';
import { DbDeleteUser } from '@/core/application/user/db-delete-user';
import { DbUpdateUser } from '@/core/application/user/db-update-user';
import { User } from '@/core/domain/models/user.entity';
import { UserTypeOrmRepository } from '@/infra/db/typeorm/repositories/user-typeorm.repository';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { IDbListUserRepository } from '@/core/domain/protocols/db/user/list-user-respository';
import { IHasher } from '@/core/domain/protocols/cryptography/hasher';
import { BcryptAdapter } from '@/infra/adapters/bcrypt-adapter';

export const userProvider: Provider[] = [
  DbAddUser,
  DbListUser,
  DbDeleteUser,
  DbUpdateUser,
  BcryptAdapter,
  {
    provide: UserTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new UserTypeOrmRepository(dataSource.getRepository(User));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: IHasher,
    useClass: BcryptAdapter,
  },
  {
    provide: UserRepository,
    useClass: UserTypeOrmRepository,
  },
  {
    provide: CityTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new CityTypeOrmRepository(dataSource.getRepository(City));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: IDbAddUserRepository,
    useFactory: (
      userRepository: UserRepository,
      hasher: IHasher,
    ): DbAddUser => {
      return new DbAddUser(userRepository, hasher);
    },
    inject: [UserTypeOrmRepository, BcryptAdapter],
  },
  {
    provide: IDbListUserRepository,
    useFactory: (userRepository: UserRepository): DbListUser => {
      return new DbListUser(userRepository);
    },
    inject: [UserTypeOrmRepository],
  },
  {
    provide: IDbUpdateUserRepository,
    useFactory: (userRepository: UserRepository): DbUpdateUser => {
      return new DbUpdateUser(userRepository);
    },
    inject: [UserTypeOrmRepository],
  },
  {
    provide: IDbDeleteUserRepository,
    useFactory: (userRepository: UserRepository): DbDeleteUser => {
      return new DbDeleteUser(userRepository);
    },
    inject: [UserTypeOrmRepository],
  },
];
