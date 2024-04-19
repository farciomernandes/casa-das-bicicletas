import { User } from '@/core/domain/models/user.entity';

export abstract class IDbListUserRepository {
  abstract getAll(): Promise<User[]>;
}
