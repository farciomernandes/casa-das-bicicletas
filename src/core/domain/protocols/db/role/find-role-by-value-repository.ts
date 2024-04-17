import { Role } from '@/core/domain/models/role.entity';

export abstract class IDbFindRoleByEmailRepository {
  abstract findByValue(value: string): Promise<Role>;
}
