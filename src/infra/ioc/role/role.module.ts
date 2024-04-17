import { Module } from '@nestjs/common';
import { IDbAddRoleRepository } from '@/core/domain/protocols/db/role/add-role-repository';
import { IDbListRoleRepository } from '@/core/domain/protocols/db/role/list-role-respository';
import { RoleRepository } from '@/core/domain/protocols/db/repositories/role';
import { RoleController } from '@/presentation/controllers/role/role-controller';
import { roleProvider } from './role.provider';
import { IDbDeleteRoleRepository } from '@/core/domain/protocols/db/role/delete-role-repository';

@Module({
  imports: [],
  providers: [...roleProvider],
  controllers: [RoleController],
  exports: [
    IDbAddRoleRepository,
    IDbListRoleRepository,
    IDbDeleteRoleRepository,
    RoleRepository,
  ],
})
export class RoleModule {}
