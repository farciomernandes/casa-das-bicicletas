import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IDbDeleteStateRepository } from '@/core/domain/protocols/db/state/delete-state-repository';
import { StateRepository } from '@/core/domain/protocols/repositories/state';

@Injectable()
export class DbDeleteState implements IDbDeleteStateRepository {
  constructor(private readonly stateRepository: StateRepository) {}

  async delete(id: string): Promise<void> {
    try {
      const alreadyExists = await this.stateRepository.findById(id);

      if (!alreadyExists) {
        throw new BadRequestException(`State not found`);
      }
      await this.stateRepository.delete(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
