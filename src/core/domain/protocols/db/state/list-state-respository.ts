import { State } from '@/core/domain/models/state.entity';

export abstract class IDbListStateRepository {
  abstract getAll(): Promise<State[]>;
}
