import { City } from '@/core/domain/models/city.entity';
import { CityParamsDto } from '@/presentation/dtos/city/params-city.dto';

export abstract class IDbListCityRepository {
  abstract getAll(params?: CityParamsDto): Promise<City[]>;
}
