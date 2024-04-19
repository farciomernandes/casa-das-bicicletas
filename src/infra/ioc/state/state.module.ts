import { Module } from '@nestjs/common';
import { stateProvider } from './state.provider';
import { IDbAddStateRepository } from '@/core/domain/protocols/db/state/add-state-repository';
import { IDbListStateRepository } from '@/core/domain/protocols/db/state/list-state-respository';
import { IDbDeleteStateRepository } from '@/core/domain/protocols/db/state/delete-state-repository';
import { IDbUpdateStateRepository } from '@/core/domain/protocols/db/state/update-state-repository';
import { StateController } from '@/presentation/controllers/state/state-controller';
import { StateRepository } from '@/core/domain/protocols/repositories/state';

@Module({
  imports: [],
  providers: [...stateProvider],
  controllers: [StateController],
  exports: [
    IDbAddStateRepository,
    IDbListStateRepository,
    IDbDeleteStateRepository,
    IDbUpdateStateRepository,
    StateRepository,
  ],
})
export class StateModule {}
