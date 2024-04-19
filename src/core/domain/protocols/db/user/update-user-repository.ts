import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';
import { User } from '@/core/domain/models/user.entity';

export abstract class IDbUpdateUserRepository {
  abstract update(payload: Omit<UserModelDto, 'id'>, id: string): Promise<User>;
}
