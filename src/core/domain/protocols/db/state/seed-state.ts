import { StateModel } from '@/presentation/dtos/State/State-model.dto';

export abstract class IStateSeed {
  abstract seedStates(): Promise<StateModel[]>;
}
