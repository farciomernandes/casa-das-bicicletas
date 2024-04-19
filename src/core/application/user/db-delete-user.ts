import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbDeleteUserRepository } from '@/core/domain/protocols/db/user/delete-user-repository';
import { UserRepository } from '@/core/domain/protocols/repositories/user';

@Injectable()
export class DbDeleteUser implements IDbDeleteUserRepository {
  constructor(private readonly userRepository: UserRepository) {}

  async delete(id: string): Promise<void> {
    const alreadyExists = await this.userRepository.findById(id);

    if (!alreadyExists) {
      throw new BadRequestException(`User not found`);
    }
    await this.userRepository.delete(id);
  }
}
