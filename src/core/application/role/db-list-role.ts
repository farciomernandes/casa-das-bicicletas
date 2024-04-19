import { IDbListRoleRepository } from '@/core/domain/protocols/db/role/list-role-respository';
import { Injectable } from '@nestjs/common';
import { Role } from '@/core/domain/models/role.entity';
import { RoleRepository } from '@/core/domain/protocols/repositories/role';

@Injectable()
export class DbListRole implements IDbListRoleRepository {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getAll(): Promise<Role[]> {
    return this.roleRepository.getAll();
  }
}
