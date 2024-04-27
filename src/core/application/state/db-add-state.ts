import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IDbAddStateRepository } from '@/core/domain/protocols/db/state/add-state-repository';
import { State } from '@/core/domain/models/state.entity';
import { StateRepository } from '@/core/domain/protocols/repositories/state';

@Injectable()
export class DbAddState implements IDbAddStateRepository {
  constructor(private readonly stateRepository: StateRepository) {}

  async create(payload: Omit<State, 'id'>): Promise<State> {
    try {
      const alreadyExists = await this.stateRepository.findByName(payload.name);

      if (alreadyExists && alreadyExists.id) {
        throw new BadRequestException(
          `Already exists a State with ${payload.name} name.`,
        );
      }
      const state = await this.stateRepository.create(payload);

      return state;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
