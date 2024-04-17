import { Injectable } from '@nestjs/common';
import { IDbFindRoleByValueRepository } from '../../../protocols/db/role/find-role-by-value-repository';
import { IDbListRoleRepository } from '../../../protocols/db/role/list-role-respository';
import { IDbAddRoleRepository } from '../../../protocols/db/role/add-role-repository';
import { Role } from '@/core/domain/models/role.entity';
import { IDbDeleteRoleRepository } from '../role/delete-role-repository';
import { IDbFindRoleByIdRepository } from '../role/find-role-by-id-repository';
import { RoleModel } from '@/presentation/dtos/role/role-model.dto';
import { IDbUpdateRoleRepository } from '../role/update-role-repository';
@Injectable()
export abstract class RoleRepository
  implements
    IDbAddRoleRepository,
    IDbListRoleRepository,
    IDbFindRoleByIdRepository,
    IDbFindRoleByValueRepository,
    IDbUpdateRoleRepository,
    IDbDeleteRoleRepository
{
  abstract findByValue(value: string): Promise<Role>;
  abstract findById(id: string): Promise<Role>;
  abstract getAll(): Promise<Role[]>;
  abstract create(payload: Omit<RoleModel, 'id'>): Promise<Role>;
  abstract delete(id: string): Promise<void>;
  abstract update(payload: Omit<RoleModel, 'id'>, id: string): Promise<Role>;
}
