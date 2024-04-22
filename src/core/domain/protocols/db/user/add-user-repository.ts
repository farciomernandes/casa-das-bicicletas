import { User } from '@/core/domain/models/user.entity';
import { AddUserDto } from '@/presentation/dtos/user/add-user.dto';

export abstract class IDbAddUserRepository {
  abstract create(payload: AddUserDto): Promise<User>;
}
