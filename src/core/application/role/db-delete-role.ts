import { BadRequestException, Injectable } from '@nestjs/common';
import { RoleRepository } from '@/core/domain/protocols/db/repositories/role';
import { IDbDeleteRoleRepository } from '@/core/domain/protocols/db/role/delete-role-repository';

@Injectable()
export class DbDeleteRole implements IDbDeleteRoleRepository {
  constructor(private readonly roleRepository: RoleRepository) {}

  async delete(id: string): Promise<void> {
    const alreadyExists = await this.roleRepository.findById(id);

    if (!alreadyExists) {
      throw new BadRequestException(`Role not found`);
    }
    await this.roleRepository.delete(id);
  }
}
