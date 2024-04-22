import { AttributesModel } from '@/presentation/dtos/attributes/attributes-model.dto';
import { Attributes } from '@/core/domain/models/attributes.entity';

export abstract class IDbUpdateAttributesRepository {
  abstract update(
    payload: Omit<AttributesModel, 'id'>,
    id: string,
  ): Promise<Attributes>;
}
