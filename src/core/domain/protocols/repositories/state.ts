import { Injectable } from '@nestjs/common';
import { State } from '@/core/domain/models/state.entity';
import { IDbAddStateRepository } from '../db/state/add-state-repository';
import { IDbListStateRepository } from '../db/state/list-state-respository';
import { IDbUpdateStateRepository } from '../db/state/update-state-repository';
import { IDbFindStateByValueRepository } from '../db/state/find-state-by-name-repository';
import { IDbFindStateByIdRepository } from '../db/state/find-state-by-id-repository';
import { IDbDeleteStateRepository } from '../db/state/delete-state-repository';

@Injectable()
export abstract class StateRepository
  implements
    IDbAddStateRepository,
    IDbListStateRepository,
    IDbUpdateStateRepository,
    IDbFindStateByValueRepository,
    IDbFindStateByIdRepository,
    IDbDeleteStateRepository
{
  abstract findById(id: string): Promise<State>;
  abstract findByName(name: string): Promise<State>;
  abstract getAll(): Promise<State[]>;
  abstract create(payload: Omit<State, 'id'>): Promise<State>;
  abstract delete(id: string): Promise<void>;
  abstract update(payload: Omit<State, 'id'>, id: string): Promise<State>;
}
