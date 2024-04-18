import { IDbListStateRepository } from '@/core/domain/protocols/db/state/list-state-respository';
import { Injectable } from '@nestjs/common';
import { State } from '@/core/domain/models/state.entity';
import { StateRepository } from '@/core/domain/protocols/db/repositories/state';

@Injectable()
export class DbListState implements IDbListStateRepository {
  constructor(private readonly stateRepository: StateRepository) {}

  async getAll(): Promise<State[]> {
    return this.stateRepository.getAll();
  }
}
