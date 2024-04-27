import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IDbAddAttributesRepository } from '@/core/domain/protocols/db/attributes/add-attributes-repository';
import { Attributes } from '@/core/domain/models/attributes.entity';
import { AttributesRepository } from '@/core/domain/protocols/repositories/attributes';
import { S3UploadImage } from '@/core/domain/protocols/aws/s3-upload-image';
import { AddAttributesModel } from '@/presentation/dtos/attributes/add-attributes.dto';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';

@Injectable()
export class DbAddAttributes implements IDbAddAttributesRepository {
  constructor(
    private readonly attributesRepository: AttributesRepository,
    private readonly productRepository: ProductRepository,
    private readonly s3Upload: S3UploadImage,
  ) {}

  async create(
    payload: Omit<AddAttributesModel, 'image_link'>,
    image_link: Express.Multer.File,
  ): Promise<Attributes> {
    try {
      const alreadyExists = await this.productRepository.findById(
        payload.product_id,
      );

      if (!alreadyExists) {
        throw new BadRequestException(
          `Product with ${payload.product_id} id not found.`,
        );
      }
      const objectUrl = await this.s3Upload.saveFile(image_link);

      return this.attributesRepository.create({
        ...payload,
        image_link: objectUrl,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
