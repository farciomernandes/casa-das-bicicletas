import { Injectable } from '@nestjs/common';
import { IDbAddAttributesRepository } from '@/core/domain/protocols/db/attributes/add-attributes-repository';
import { Attributes } from '@/core/domain/models/attributes.entity';
import { AttributesRepository } from '@/core/domain/protocols/repositories/attributes';

@Injectable()
export class DbAddAttributes implements IDbAddAttributesRepository {
  constructor(private readonly attributesRepository: AttributesRepository) {}

  async create(payload: Omit<Attributes, 'id'>): Promise<Attributes> {
    return this.attributesRepository.create(payload);
  }
}
