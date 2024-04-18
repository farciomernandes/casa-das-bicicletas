import { BadRequestException, Injectable } from '@nestjs/common';
import { StateRepository } from '@/core/domain/protocols/db/repositories/state';
import { IDbUpdateStateRepository } from '@/core/domain/protocols/db/state/update-state-repository';
import { State } from '@/core/domain/models/state.entity';

@Injectable()
export class DbUpdateState implements IDbUpdateStateRepository {
  constructor(private readonly stateRepository: StateRepository) {}

  async update(payload: Omit<State, 'id'>, id: string): Promise<State> {
    try {
      return await this.stateRepository.update(payload, id);
    } catch (error) {
      if (error.message === 'State not found') {
        throw new BadRequestException(`State not found`);
      } else {
        throw error;
      }
    }
  }
}
