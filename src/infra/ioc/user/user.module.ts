import { Module } from '@nestjs/common';
import { userProvider } from './user.provider';
import { IDbAddUserRepository } from '@/core/domain/protocols/db/user/add-user-repository';
import { IDbDeleteUserRepository } from '@/core/domain/protocols/db/user/delete-user-repository';
import { IDbUpdateUserRepository } from '@/core/domain/protocols/db/user/update-user-repository';
import { IDbListUserRepository } from '@/core/domain/protocols/db/user/list-user-respository';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { UserController } from '@/presentation/controllers/user/user-controller';
import { IHasher } from '@/core/domain/protocols/cryptography/hasher';

@Module({
  imports: [],
  providers: [...userProvider],
  controllers: [UserController],
  exports: [
    IDbAddUserRepository,
    IDbListUserRepository,
    IDbDeleteUserRepository,
    IDbUpdateUserRepository,
    IHasher,
    UserRepository,
  ],
})
export class UserModule {}
