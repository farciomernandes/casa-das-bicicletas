import { Repository } from 'typeorm';
import { User } from '@/core/domain/models/user.entity';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';
import { UserRepository } from '@/core/domain/protocols/repositories/user';

export class UserTypeOrmRepository implements UserRepository {
  constructor(private readonly userRepository: Repository<User>) {}
  async update(payload: Omit<UserModelDto, 'id'>, id: string): Promise<User> {
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

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['address'],
    });
  }

  async create(payload: Omit<User, 'id'>): Promise<User> {
    const User = this.userRepository.create(payload);
    return this.userRepository.save(User);
  }
}
