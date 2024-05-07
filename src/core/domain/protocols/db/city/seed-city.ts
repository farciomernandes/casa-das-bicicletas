import { CityModel } from '@/presentation/dtos/city/city-model.dto';

export abstract class ICitySeed {
  abstract seedCities(): Promise<CityModel[]>;
}
