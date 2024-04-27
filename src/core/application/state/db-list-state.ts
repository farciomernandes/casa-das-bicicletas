import { IDbListStateRepository } from '@/core/domain/protocols/db/state/list-state-respository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { State } from '@/core/domain/models/state.entity';
import { StateRepository } from '@/core/domain/protocols/repositories/state';

@Injectable()
export class DbListState implements IDbListStateRepository {
  constructor(private readonly stateRepository: StateRepository) {}

  async getAll(): Promise<State[]> {
    try {
      return this.stateRepository.getAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
