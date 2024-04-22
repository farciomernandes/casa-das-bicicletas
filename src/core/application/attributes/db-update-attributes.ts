import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbUpdateAttributesRepository } from '@/core/domain/protocols/db/attributes/update-attributes-repository';
import { Attributes } from '@/core/domain/models/attributes.entity';
import { AttributesRepository } from '@/core/domain/protocols/repositories/attributes';

@Injectable()
export class DbUpdateAttributes implements IDbUpdateAttributesRepository {
  constructor(private readonly AttributesRepository: AttributesRepository) {}

  async update(
    payload: Omit<Attributes, 'id'>,
    id: string,
  ): Promise<Attributes> {
    try {
      return await this.AttributesRepository.update(payload, id);
    } catch (error) {
      if (error.message === 'Attributes not found') {
        throw new BadRequestException(`Attributes not found`);
      } else {
        throw error;
      }
    }
  }
}
