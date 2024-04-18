import { Injectable } from '@nestjs/common';
import { IDbListStateRepository } from '../state/list-state-respository';
import { IDbAddStateRepository } from '../state/add-state-repository';
import { State } from '@/core/domain/models/state.entity';
import { IDbDeleteStateRepository } from '../state/delete-state-repository';
import { IDbUpdateStateRepository } from '../state/update-state-repository';
import { IDbFindStateByValueRepository } from '../state/find-state-by-name-repository';
import { IDbFindStateByIdRepository } from '../state/find-state-by-id-repository';

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
