import { Injectable } from '@nestjs/common';
import { User } from '@/core/domain/models/user.entity';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { IDbListUserRepository } from '@/core/domain/protocols/db/user/list-user-respository';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';
import { AddressModelDto } from '@/presentation/dtos/address/address-model.dto';
import { CityModel } from '@/presentation/dtos/city/city-model.dto';
import { StateModel } from '@/presentation/dtos/state/state-model.dto';

@Injectable()
export class DbListUser implements IDbListUserRepository {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll(): Promise<UserModelDto[]> {
    try {
      const users = await this.userRepository.getAll();

      return users.map((user) => {
        return {
          ...UserModelDto.toDto(user),
          address: {
            ...AddressModelDto.toDto(user.address),
            city: CityModel.toDto(user.address.city),
            state: StateModel.toDto(user.address.state),
          },
        };
      });
    } catch (error) {
      console.log('Error delete user ', error);
      return error;
    }
  }
}
