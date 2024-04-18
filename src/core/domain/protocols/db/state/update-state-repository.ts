import { State } from '@/core/domain/models/state.entity';

export abstract class IDbUpdateStateRepository {
  abstract update(payload: Omit<State, 'id'>, id: string): Promise<State>;
}
