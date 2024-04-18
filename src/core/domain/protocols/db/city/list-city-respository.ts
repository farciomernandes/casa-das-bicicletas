import { City } from '@/core/domain/models/city.entity';

export abstract class IDbListCityRepository {
  abstract getAll(): Promise<City[]>;
}
