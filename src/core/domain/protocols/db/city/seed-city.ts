import { CityModel } from '@/presentation/dtos/City/City-model.dto';

export abstract class ICitySeed {
  abstract seedCities(): Promise<CityModel[]>;
}
