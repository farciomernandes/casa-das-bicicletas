import { Module } from '@nestjs/common';
import { IDbAddRoleRepository } from '@/core/domain/protocols/db/role/add-role-repository';
import { IDbListRoleRepository } from '@/core/domain/protocols/db/role/list-role-respository';
import { DbAddRole } from '@/core/application/role/db-add-role';
import { DbListRole } from '@/core/application/role/db-list-role';
import { RoleController } from '@/presentation/controllers/role/role-controller';
import { RoleTypeOrmRepository } from '../db/typeorm/repositories/role-typeorm.repository';
import { Role } from '@/core/domain/models/role.entity';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RoleRepository } from '@/core/domain/protocols/db/repositories/role';

@Module({
  imports: [],
  providers: [
    DbAddRole,
    DbListRole,
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
  ],
  controllers: [RoleController],
  exports: [IDbAddRoleRepository, IDbListRoleRepository, RoleRepository],
})
export class RoleModule {}
