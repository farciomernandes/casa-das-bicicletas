import { City } from '@/core/domain/models/city.entity';
import { CityModel } from '@/presentation/dtos/city/city-model.dto';

export abstract class IDbAddCityRepository {
  abstract create(payload: Omit<CityModel, 'id'>): Promise<City>;
}
