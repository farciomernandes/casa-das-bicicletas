import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IDbAddCategoryRepository } from '@/core/domain/protocols/db/category/add-category-repository';
import { Category } from '@/core/domain/models/category.entity';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';
import { S3UploadImage } from '@/core/domain/protocols/aws/s3-upload-image';
import { AddCategoryDto } from '@/presentation/dtos/category/add-category.dto';

@Injectable()
export class DbAddCategory implements IDbAddCategoryRepository {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly s3Upload: S3UploadImage,
  ) {}

  async create(
    payload: Omit<AddCategoryDto, 'image_link'>,
    image_link: Express.Multer.File,
  ): Promise<Category> {
    try {
      const alreadyExists = await this.categoryRepository.findByName(
        payload.name,
      );

      if (alreadyExists) {
        throw new BadRequestException(
          `Category with ${payload.name} name already exists`,
        );
      }
      const objectUrl = await this.s3Upload.saveFile(image_link);

      return await this.categoryRepository.create({
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
