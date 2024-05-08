import { Repository } from 'typeorm';
import { User } from '@/core/domain/models/user.entity';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { UpdateUserDto } from '@/presentation/dtos/user/update-user.dto';

export class UserTypeOrmRepository implements UserRepository {
  constructor(private readonly userRepository: Repository<User>) {}
  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
  async update(payload: UpdateUserDto, id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id },
      });

      this.userRepository.merge(user, payload);
      return this.userRepository.save(user);
    } catch (error) {
      throw new Error('User not found');
    }
  }

  async findById(id: string): Promise<any> {
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getAll(): Promise<any> {
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

      return { users, total };
    } catch (error) {
      console.log(error);
    }
  }

  async create(payload: Omit<User, 'id'>): Promise<User> {
    const User = this.userRepository.create(payload);
    return this.userRepository.save(User);
  }
}
