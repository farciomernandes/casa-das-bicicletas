import { Module } from '@nestjs/common';
import { CityRepository } from '@/core/domain/protocols/db/repositories/city';
import { cityProvider } from './city.provider';
import { IDbAddCityRepository } from '@/core/domain/protocols/db/city/add-city-repository';
import { IDbListCityRepository } from '@/core/domain/protocols/db/city/list-city-respository';
import { IDbDeleteCityRepository } from '@/core/domain/protocols/db/city/delete-city-repository';
import { IDbUpdateCityRepository } from '@/core/domain/protocols/db/city/update-city-repository';
import { CityController } from '@/presentation/controllers/city/city-controller';

@Module({
  imports: [],
  providers: [...cityProvider],
  controllers: [CityController],
  exports: [
    IDbAddCityRepository,
    IDbListCityRepository,
    IDbDeleteCityRepository,
    IDbUpdateCityRepository,
    CityRepository,
  ],
})
export class CityModule {}
