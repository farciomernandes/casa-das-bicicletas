import { CityListDto } from '@/presentation/dtos/city/city-model.dto';
import { CityParamsDto } from '@/presentation/dtos/city/params-city.dto';

export abstract class IDbListCityRepository {
  abstract getAll(params?: CityParamsDto): Promise<CityListDto>;
}
