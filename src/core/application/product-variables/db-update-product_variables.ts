import { ProductVariables } from '@/core/domain/models/product_variables.entity';
import { S3UploadImage } from '@/core/domain/protocols/aws/s3-upload-image';
import { IDbUpdateProductVariablesRepository } from '@/core/domain/protocols/db/product_variables/update-product_variable-repository';
import { ProductVariablesRepository } from '@/core/domain/protocols/repositories/product_variable';
import { UpdateProductVariablesModel } from '@/presentation/dtos/product_variable/update-product_variables.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class DbUpdateProductVariables
  implements IDbUpdateProductVariablesRepository
{
  constructor(
    private readonly productVariablesRepository: ProductVariablesRepository,
    private readonly s3Upload: S3UploadImage,
  ) {}

  async update(
    payload: Omit<UpdateProductVariablesModel, 'image_link'>,
    id: string,
    image_link: Express.Multer.File,
  ): Promise<ProductVariables> {
    try {
      const alreadyExists = await this.productVariablesRepository.findById(id);

      if (!alreadyExists) {
        throw new BadRequestException(
          `Product Variables with ${id} id not found.`,
        );
      }
      let objectUrl = alreadyExists.image_link;
      if (image_link) {
        objectUrl = await this.s3Upload.saveFile(image_link);
      }

      return await this.productVariablesRepository.update(
        payload,
        id,
        objectUrl,
      );
    } catch (error) {
      if (error.message === 'ProductVariables not found') {
        throw new BadRequestException(`ProductVariables not found`);
      } else {
        throw error;
      }
    }
  }
}
