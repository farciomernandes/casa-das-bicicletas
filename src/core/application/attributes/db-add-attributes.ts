import { Injectable } from '@nestjs/common';
import { IDbAddAttributesRepository } from '@/core/domain/protocols/db/attributes/add-attributes-repository';
import { Attributes } from '@/core/domain/models/attributes.entity';
import { AttributesRepository } from '@/core/domain/protocols/repositories/attributes';
import { S3UploadImage } from '@/core/domain/protocols/aws/s3-upload-image';
import { AddAttributesModel } from '@/presentation/dtos/attributes/add-attributes.dto';

@Injectable()
export class DbAddAttributes implements IDbAddAttributesRepository {
  constructor(
    private readonly attributesRepository: AttributesRepository,
    private readonly s3Upload: S3UploadImage,
  ) {}

  async create(
    payload: Omit<AddAttributesModel, 'image_link'>,
    image_link: Express.Multer.File,
  ): Promise<Attributes> {
    const objectUrl = await this.s3Upload.saveFile(image_link);

    return this.attributesRepository.create({
      ...payload,
      image_link: objectUrl,
    });
  }
}
