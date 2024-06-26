import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IDbDeleteCityRepository } from '@/core/domain/protocols/db/city/delete-city-repository';
import { CityRepository } from '@/core/domain/protocols/repositories/city';

@Injectable()
export class DbDeleteCity implements IDbDeleteCityRepository {
  constructor(private readonly cityRepository: CityRepository) {}

  async delete(id: string): Promise<void> {
    try {
      const alreadyExists = await this.cityRepository.findById(id);

      if (!alreadyExists) {
        throw new BadRequestException(`City not found`);
      }
      await this.cityRepository.delete(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
