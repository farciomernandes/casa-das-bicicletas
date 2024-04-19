import { User } from '@/core/domain/models/user.entity';

export abstract class IDbFindUserByIdRepository {
  abstract findById(id: string): Promise<User>;
}
