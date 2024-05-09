import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IDbAddUserRepository } from '@/core/domain/protocols/db/user/add-user-repository';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { IHasher } from '@/core/domain/protocols/cryptography/hasher';
import { AddUserDto } from '@/presentation/dtos/user/add-user.dto';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';

@Injectable()
export class DbAddUser implements IDbAddUserRepository {
  private readonly logger = new Logger(DbAddUser.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: IHasher,
  ) {}

  async create(payload: AddUserDto): Promise<UserModelDto> {
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

      const createdUser = await this.userRepository.create({
        ...payload,
        password: password_hash,
      });

      return createdUser;
    } catch (error) {
      this.logger.error(error.message);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
