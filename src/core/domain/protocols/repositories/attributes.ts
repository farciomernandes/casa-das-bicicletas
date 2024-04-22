import { Injectable } from '@nestjs/common';
import { Attributes } from '@/core/domain/models/attributes.entity';
import { IDbListAttributesRepository } from '../db/attributes/list-attributes-respository';
import { IDbUpdateAttributesRepository } from '../db/attributes/update-attributes-repository';
import { IDbDeleteAttributesRepository } from '../db/attributes/delete-attributes-repository';
import { IDbAddAttributesRepository } from '../db/attributes/add-attributes-repository';
import { IDbFinddAttributesByIdRepository } from '../db/attributes/find-attributes-by-id-repository';

@Injectable()
export abstract class AttributesRepository
  implements
    IDbAddAttributesRepository,
    IDbListAttributesRepository,
    IDbUpdateAttributesRepository,
    IDbFinddAttributesByIdRepository,
    IDbDeleteAttributesRepository
{
  abstract findById(id: string): Promise<Attributes>;
  abstract getAll(): Promise<Attributes[]>;
  abstract create(payload: Omit<Attributes, 'id'>): Promise<Attributes>;
  abstract delete(id: string): Promise<void>;
  abstract update(
    payload: Omit<Attributes, 'id'>,
    id: string,
  ): Promise<Attributes>;
}
