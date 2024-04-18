import { State } from '@/core/domain/models/state.entity';

export abstract class IDbFindStateByValueRepository {
  abstract findByName(name: string): Promise<State>;
}
