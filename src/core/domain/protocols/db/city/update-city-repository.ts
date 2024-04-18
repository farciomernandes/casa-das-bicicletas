import { CityModel } from '@/presentation/dtos/city/city-model.dto';
import { City } from '@/core/domain/models/city.entity';

export abstract class IDbUpdateCityRepository {
  abstract update(payload: Omit<CityModel, 'id'>, id: string): Promise<City>;
}
