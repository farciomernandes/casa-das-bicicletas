import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IDbDeleteAttributesRepository } from '@/core/domain/protocols/db/attributes/delete-attributes-repository';
import { AttributesRepository } from '@/core/domain/protocols/repositories/attributes';

@Injectable()
export class DbDeleteAttributes implements IDbDeleteAttributesRepository {
  constructor(private readonly attributesRepository: AttributesRepository) {}

  async delete(id: string): Promise<void> {
    try {
      const alreadyExists = await this.attributesRepository.findById(id);

      if (!alreadyExists) {
        throw new BadRequestException(`Attributes not found`);
      }
      await this.attributesRepository.delete(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
