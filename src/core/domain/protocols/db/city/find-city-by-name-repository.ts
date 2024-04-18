import { City } from '@/core/domain/models/city.entity';

export abstract class IDbFindCityByValueRepository {
  abstract findByName(name: string): Promise<City>;
}
