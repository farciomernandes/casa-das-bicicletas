import { User } from '@/core/domain/models/user.entity';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';

export abstract class IDbAddUserRepository {
  abstract create(payload: Omit<UserModelDto, 'id'>): Promise<User>;
}
