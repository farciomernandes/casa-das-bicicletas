import { Injectable } from '@nestjs/common';
import { IDbFindRoleByValueRepository } from '../../../protocols/db/role/find-role-by-value-repository';
import { IDbListRoleRepository } from '../../../protocols/db/role/list-role-respository';
import { IDbAddRoleRepository } from '../../../protocols/db/role/add-role-repository';
import { Role } from '@/core/domain/models/role.entity';
import { IDbDeleteRoleRepository } from '../role/delete-role-repository';
import { IDbFindRoleByIdRepository } from '../role/find-role-by-id-repository';
@Injectable()
export abstract class RoleRepository
  implements
    IDbAddRoleRepository,
    IDbListRoleRepository,
    IDbFindRoleByIdRepository,
    IDbFindRoleByValueRepository,
    IDbDeleteRoleRepository
{
  abstract findByValue(value: string): Promise<Role>;
  abstract findById(id: string): Promise<Role>;
  abstract getAll(): Promise<Role[]>;
  abstract create(payload: Omit<Role, 'id'>): Promise<Role>;
  abstract delete(id: string): Promise<void>;
}
