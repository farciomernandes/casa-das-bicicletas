import { Injectable } from '@nestjs/common';
import { User } from '@/core/domain/models/user.entity';
import { IDbAddUserRepository } from '../db/user/add-user-repository';
import { IDbUpdateUserRepository } from '../db/user/update-user-repository';
import { IDbFindUserByIdRepository } from '../db/user/find-user-by-id-repository';
import { IDbDeleteUserRepository } from '../db/user/delete-user-repository';
import { IDbListUserRepository } from '../db/user/list-user-respository';
import { IDbFindUserByEmailRepository } from '../db/user/find-user-by-email-repository';
import { UpdateUserDto } from '@/presentation/dtos/user/update-user.dto';
import { AddUserDto } from '@/presentation/dtos/user/add-user.dto';

@Injectable()
export abstract class UserRepository
  implements
    IDbAddUserRepository,
    IDbListUserRepository,
    IDbUpdateUserRepository,
    IDbFindUserByIdRepository,
    IDbFindUserByEmailRepository,
    IDbDeleteUserRepository
{
  abstract findById(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract getAll(): Promise<User[]>;
  abstract create(payload: AddUserDto): Promise<User>;
  abstract delete(id: string): Promise<void>;
  abstract update(payload: UpdateUserDto, id: string): Promise<User>;
}
