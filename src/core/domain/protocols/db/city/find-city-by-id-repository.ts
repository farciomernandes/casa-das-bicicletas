import { City } from '@/core/domain/models/city.entity';

export abstract class IDbFindCityByIdRepository {
  abstract findById(id: string): Promise<City>;
}
