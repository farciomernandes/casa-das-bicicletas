import { Repository } from 'typeorm';
import { Role } from '@/core/domain/models/role.entity';
import { RoleRepository } from '@/core/domain/protocols/db/repositories/role';

export class RoleTypeOrmRepository implements RoleRepository {
  constructor(private readonly roleRepository: Repository<Role>) {}

  async findById(id: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }

  async findByValue(value: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { value } });
  }

  async getAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }
  async create(payload: Omit<Role, 'id'>): Promise<Role> {
    const role = this.roleRepository.create(payload);
    return this.roleRepository.save(role);
  }
}
