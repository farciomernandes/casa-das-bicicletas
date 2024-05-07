import { StateModel } from '@/presentation/dtos/state/state-model.dto';

export abstract class IStateSeed {
  abstract seedStates(): Promise<StateModel[]>;
}
