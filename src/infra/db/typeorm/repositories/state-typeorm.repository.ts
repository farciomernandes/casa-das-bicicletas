import { Repository } from 'typeorm';
import { State } from '@/core/domain/models/state.entity';
import { StateRepository } from '@/core/domain/protocols/repositories/state';

export class StateTypeOrmRepository implements StateRepository {
  constructor(private readonly stateRepository: Repository<State>) {}
  async findByName(name: string): Promise<State> {
    return this.stateRepository.findOne({ where: { name } });
  }

  async update(payload: Omit<State, 'id'>, id: string): Promise<State> {
    try {
      const State = await this.stateRepository.findOneOrFail({
        where: { id },
      });

      this.stateRepository.merge(State, payload);
      return this.stateRepository.save(State);
    } catch (error) {
      throw new Error('State not found');
    }
  }

  async findById(id: string): Promise<State> {
    return this.stateRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.stateRepository.delete(id);
  }

  async getAll(): Promise<State[]> {
    return this.stateRepository.find();
  }

  async create(payload: Omit<State, 'id'>): Promise<State> {
    const State = this.stateRepository.create(payload);
    return this.stateRepository.save(State);
  }
}
