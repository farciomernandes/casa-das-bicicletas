import { BadRequestException, Injectable } from '@nestjs/common';
import { CityRepository } from '@/core/domain/protocols/db/repositories/city';
import { IDbDeleteCityRepository } from '@/core/domain/protocols/db/city/delete-city-repository';

@Injectable()
export class DbDeleteCity implements IDbDeleteCityRepository {
  constructor(private readonly cityRepository: CityRepository) {}

  async delete(id: string): Promise<void> {
    const alreadyExists = await this.cityRepository.findById(id);

    if (!alreadyExists) {
      throw new BadRequestException(`City not found`);
    }
    await this.cityRepository.delete(id);
  }
}
