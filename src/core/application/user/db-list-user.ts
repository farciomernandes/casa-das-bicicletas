import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { IDbListUserRepository } from '@/core/domain/protocols/db/user/list-user-respository';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';

@Injectable()
export class DbListUser implements IDbListUserRepository {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll(): Promise<UserModelDto[]> {
    try {
      const users = await this.userRepository.getAll();

      return users.map((user) => UserModelDto.toDto(user));
    } catch (error) {
      return error;
    }
  }
}
