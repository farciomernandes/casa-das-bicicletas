import { Injectable } from '@nestjs/common';
import { User } from '@/core/domain/models/user.entity';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { IDbListUserRepository } from '@/core/domain/protocols/db/user/list-user-respository';

@Injectable()
export class DbListUser implements IDbListUserRepository {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll(): Promise<User[]> {
    try {
      return await this.userRepository.getAll();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
