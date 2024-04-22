import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbUpdateAttributesRepository } from '@/core/domain/protocols/db/attributes/update-attributes-repository';
import { Attributes } from '@/core/domain/models/attributes.entity';
import { AttributesRepository } from '@/core/domain/protocols/repositories/attributes';
import { AddAttributesModel } from '@/presentation/dtos/attributes/add-attributes.dto';

@Injectable()
export class DbUpdateAttributes implements IDbUpdateAttributesRepository {
  constructor(private readonly attributesRepository: AttributesRepository) {}

  async update(
    payload: Omit<AddAttributesModel, 'product_id'>,
    id: string,
  ): Promise<Attributes> {
    try {
      return await this.attributesRepository.update(payload, id);
    } catch (error) {
      if (error.message === 'Attributes not found') {
        throw new BadRequestException(`Attributes not found`);
      } else {
        throw error;
      }
    }
  }
}
