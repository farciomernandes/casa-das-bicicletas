import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbUpdateUserRepository } from '@/core/domain/protocols/db/user/update-user-repository';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';
import { User } from '@/core/domain/models/user.entity';
import { UserRepository } from '@/core/domain/protocols/repositories/user';

@Injectable()
export class DbUpdateUser implements IDbUpdateUserRepository {
  constructor(private readonly userRepository: UserRepository) {}

  async update(payload: Omit<UserModelDto, 'id'>, id: string): Promise<User> {
    try {
      return await this.userRepository.update(payload, id);
    } catch (error) {
      if (error.message === 'User not found') {
        throw new BadRequestException(`User not found`);
      } else {
        throw error;
      }
    }
  }
}
