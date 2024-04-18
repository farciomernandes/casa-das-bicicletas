import { State } from '@/core/domain/models/state.entity';

export abstract class IDbFindStateByIdRepository {
  abstract findById(id: string): Promise<State>;
}
