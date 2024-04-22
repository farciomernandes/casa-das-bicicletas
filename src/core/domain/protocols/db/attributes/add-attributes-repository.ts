import { Attributes } from '@/core/domain/models/attributes.entity';
import { AddAttributesModel } from '@/presentation/dtos/attributes/add-attributes.dto';

export abstract class IDbAddAttributesRepository {
  abstract create(
    payload: Omit<AddAttributesModel, 'image_link'>,
    image_link: Express.Multer.File,
  ): Promise<Attributes>;
}
