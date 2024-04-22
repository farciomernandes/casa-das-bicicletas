import { Attributes } from '@/core/domain/models/attributes.entity';
import { AttributesModel } from '@/presentation/dtos/attributes/attributes-model.dto';

export abstract class IDbAddAttributesRepository {
  abstract create(payload: Omit<AttributesModel, 'id'>): Promise<Attributes>;
}
