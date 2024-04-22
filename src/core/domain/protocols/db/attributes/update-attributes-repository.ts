import { Attributes } from '@/core/domain/models/attributes.entity';
import { AddAttributesModel } from '@/presentation/dtos/attributes/add-attributes.dto';

export abstract class IDbUpdateAttributesRepository {
  abstract update(
    payload: Omit<AddAttributesModel, 'id'>,
    id: string,
  ): Promise<Attributes>;
}
