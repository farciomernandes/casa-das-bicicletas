import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IDbAddUserRepository } from '@/core/domain/protocols/db/user/add-user-repository';
import { User } from '@/core/domain/models/user.entity';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { IHasher } from '@/core/domain/protocols/cryptography/hasher';
import { AddUserDto } from '@/presentation/dtos/user/add-user.dto';

@Injectable()
export class DbAddUser implements IDbAddUserRepository {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: IHasher,
  ) {}

  async create(payload: AddUserDto): Promise<User> {
    try {
      const alreadyExists = await this.userRepository.findByEmail(
        payload.email,
      );

      if (alreadyExists) {
        throw new BadRequestException(
          `Already exists a user with ${payload.email} email.`,
        );
      }

      const password_hash = await this.hasher.hash(payload.password);

      return await this.userRepository.create({
        ...payload,
        password: password_hash,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
