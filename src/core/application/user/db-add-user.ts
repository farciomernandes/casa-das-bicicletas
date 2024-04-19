import { Injectable } from '@nestjs/common';
import { IDbAddUserRepository } from '@/core/domain/protocols/db/user/add-user-repository';
import { User } from '@/core/domain/models/user.entity';
import { UserRepository } from '@/core/domain/protocols/repositories/user';

@Injectable()
export class DbAddUser implements IDbAddUserRepository {
  constructor(private readonly userRepository: UserRepository) {}

  async create(payload: Omit<User, 'id'>): Promise<User> {
    return await this.userRepository.create(payload);
  }
}
