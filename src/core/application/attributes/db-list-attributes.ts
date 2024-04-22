import { IDbListAttributesRepository } from '@/core/domain/protocols/db/attributes/list-attributes-respository';
import { Injectable } from '@nestjs/common';
import { Attributes } from '@/core/domain/models/attributes.entity';
import { AttributesRepository } from '@/core/domain/protocols/repositories/attributes';

@Injectable()
export class DbListAttributes implements IDbListAttributesRepository {
  constructor(private readonly attributesRepository: AttributesRepository) {}

  async getAll(): Promise<Attributes[]> {
    return this.attributesRepository.getAll();
  }
}
