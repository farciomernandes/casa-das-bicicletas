import { Attributes } from '@/core/domain/models/attributes.entity';
import { UpdateAttributesModel } from '@/presentation/dtos/attributes/update-attributes.dto';

export abstract class IDbUpdateAttributesRepository {
  abstract update(
    payload: UpdateAttributesModel,
    id: string,
  ): Promise<Attributes>;
}
