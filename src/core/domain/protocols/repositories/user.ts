import { Injectable } from '@nestjs/common';
import { User } from '@/core/domain/models/user.entity';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';
import { IDbAddUserRepository } from '../db/user/add-user-repository';
import { IDbUpdateUserRepository } from '../db/user/update-user-repository';
import { IDbFindUserByIdRepository } from '../db/user/find-user-by-id-repository';
import { IDbDeleteUserRepository } from '../db/user/delete-user-repository';
import { IDbListUserRepository } from '../db/user/list-user-respository';

@Injectable()
export abstract class UserRepository
  implements
    IDbAddUserRepository,
    IDbListUserRepository,
    IDbUpdateUserRepository,
    IDbFindUserByIdRepository,
    IDbDeleteUserRepository
{
  abstract findById(id: string): Promise<User>;
  abstract getAll(): Promise<User[]>;
  abstract create(payload: Omit<UserModelDto, 'id'>): Promise<User>;
  abstract delete(id: string): Promise<void>;
  abstract update(payload: Omit<UserModelDto, 'id'>, id: string): Promise<User>;
}
