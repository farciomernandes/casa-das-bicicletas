import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';

export abstract class IDbListUserRepository {
  abstract getAll(): Promise<{ users: UserModelDto[]; total: number }>;
}
