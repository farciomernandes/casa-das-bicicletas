import { State } from '@/core/domain/models/state.entity';

export abstract class IDbAddStateRepository {
  abstract create(payload: Omit<State, 'id'>): Promise<State>;
}
