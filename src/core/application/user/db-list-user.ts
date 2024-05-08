import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { IDbListUserRepository } from '@/core/domain/protocols/db/user/list-user-respository';

@Injectable()
export class DbListUser implements IDbListUserRepository {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll(): Promise<any> {
    try {
      return await this.userRepository.getAll();
    } catch (error) {
      return error;
    }
  }
}
