import { Provider } from '@nestjs/common';
import { DbAddRole } from '@/core/application/role/db-add-role';
import { DbListRole } from '@/core/application/role/db-list-role';
import { RoleTypeOrmRepository } from '../../db/typeorm/repositories/role-typeorm.repository';
import { Role } from '@/core/domain/models/role.entity';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DbDeleteRole } from '@/core/application/role/db-delete-role';
import { IDbDeleteRoleRepository } from '@/core/domain/protocols/db/role/delete-role-repository';
import { RoleRepository } from '@/core/domain/protocols/db/repositories/role';
import { IDbAddRoleRepository } from '@/core/domain/protocols/db/role/add-role-repository';
import { IDbListRoleRepository } from '@/core/domain/protocols/db/role/list-role-respository';

export const roleProvider: Provider[] = [
  DbAddRole,
  DbListRole,
  DbDeleteRole,
  {
    provide: RoleTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new RoleTypeOrmRepository(dataSource.getRepository(Role));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: RoleRepository,
    useClass: RoleTypeOrmRepository,
  },
  {
    provide: IDbAddRoleRepository,
    useClass: DbAddRole,
  },
  {
    provide: IDbAddRoleRepository,
    useFactory: (roleRepository: RoleRepository): DbAddRole => {
      return new DbAddRole(roleRepository);
    },
    inject: [RoleTypeOrmRepository],
  },
  {
    provide: IDbListRoleRepository,
    useFactory: (roleRepository: RoleRepository): DbListRole => {
      return new DbListRole(roleRepository);
    },
    inject: [RoleTypeOrmRepository],
  },
  {
    provide: IDbDeleteRoleRepository,
    useFactory: (roleRepository: RoleRepository): DbDeleteRole => {
      return new DbDeleteRole(roleRepository);
    },
    inject: [RoleTypeOrmRepository],
  },
];
