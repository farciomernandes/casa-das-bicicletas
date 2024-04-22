import { User } from '@/core/domain/models/user.entity';
import { UpdateUserDto } from '@/presentation/dtos/user/update-user.dto';

export abstract class IDbUpdateUserRepository {
  abstract update(payload: UpdateUserDto, id: string): Promise<User>;
}
