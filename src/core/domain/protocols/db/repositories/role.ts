import { Injectable } from '@nestjs/common';
import { IDbFindRoleByEmailRepository } from '../../../protocols/db/role/find-role-by-value-repository';
import { IDbListRoleRepository } from '../../../protocols/db/role/list-role-respository';
import { IDbAddRoleRepository } from '../../../protocols/db/role/add-role-repository';
import { Role } from '@/core/domain/models/role.entity';
@Injectable()
export abstract class RoleRepository
  implements
    IDbAddRoleRepository,
    IDbListRoleRepository,
    IDbFindRoleByEmailRepository
{
  abstract findByValue(value: string): Promise<Role>;
  abstract getAll(): Promise<Role[]>;
  abstract create(payload: Omit<Role, 'id'>): Promise<Role>;
}
