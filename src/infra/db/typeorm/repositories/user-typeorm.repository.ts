import { Repository } from 'typeorm';
import { User } from '@/core/domain/models/user.entity';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { UpdateUserDto } from '@/presentation/dtos/user/update-user.dto';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';

export class UserTypeOrmRepository implements UserRepository {
  constructor(private readonly userRepository: Repository<User>) {}
  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
  async update(payload: UpdateUserDto, id: string): Promise<UserModelDto> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id },
      });

      this.userRepository.merge(user, payload);
      const savedUser = await this.userRepository.save(user);
      return UserModelDto.toDto(savedUser);
    } catch (error) {
      throw new Error('User not found');
    }
  }

  async findById(id: string): Promise<UserModelDto> {
    const user = await this.userRepository.findOne({ where: { id } });

    return UserModelDto.toDto(user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getAll(): Promise<{ users: UserModelDto[]; total: number }> {
    try {
      const queryBuilder = this.userRepository.createQueryBuilder('users');

      queryBuilder.leftJoinAndSelect('users.role', 'role');
      queryBuilder.leftJoinAndSelect('users.addresses', 'address');

      const page = 1;
      const size = 10;
      const skip = (page - 1) * size;

      const [users, total] = await queryBuilder
        .skip(skip)
        .take(size)
        .getManyAndCount();

      return { users: users.map((user) => UserModelDto.toDto(user)), total };
    } catch (error) {
      console.log(error);
    }
  }

  async create(payload: Omit<User, 'id'>): Promise<UserModelDto> {
    const user = this.userRepository.create(payload);
    const savedUser = await this.userRepository.save(user);
    return UserModelDto.toDto(savedUser);
  }
}
