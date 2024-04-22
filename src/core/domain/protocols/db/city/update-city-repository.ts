import { City } from '@/core/domain/models/city.entity';
import { UpdateCityDto } from '@/presentation/dtos/city/update-city.dto';

export abstract class IDbUpdateCityRepository {
  abstract update(payload: UpdateCityDto, id: string): Promise<City>;
}
