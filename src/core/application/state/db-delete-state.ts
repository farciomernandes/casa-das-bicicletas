import { BadRequestException, Injectable } from '@nestjs/common';
import { StateRepository } from '@/core/domain/protocols/db/repositories/state';
import { IDbDeleteStateRepository } from '@/core/domain/protocols/db/state/delete-state-repository';

@Injectable()
export class DbDeleteState implements IDbDeleteStateRepository {
  constructor(private readonly stateRepository: StateRepository) {}

  async delete(id: string): Promise<void> {
    const alreadyExists = await this.stateRepository.findById(id);

    if (!alreadyExists) {
      throw new BadRequestException(`State not found`);
    }
    await this.stateRepository.delete(id);
  }
}
