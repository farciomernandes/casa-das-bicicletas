import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { IDbListUserRepository } from '@/core/domain/protocols/db/user/list-user-respository';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';

@Injectable()
export class DbListUser implements IDbListUserRepository {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll(): Promise<{ users: UserModelDto[]; total: number }> {
    try {
      return await this.userRepository.getAll();
    } catch (error) {
      return error;
    }
  }
}
