import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbUpdateCategoryRepository } from '@/core/domain/protocols/db/category/update-category-repository';
import { Category } from '@/core/domain/models/category.entity';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';
import { UpdateCategoryDto } from '@/presentation/dtos/category/update-category.dto';
import { S3UploadImage } from '@/core/domain/protocols/aws/s3-upload-image';

@Injectable()
export class DbUpdateCategory implements IDbUpdateCategoryRepository {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly s3Upload: S3UploadImage,
  ) {}

  async update(
    payload: Omit<UpdateCategoryDto, 'image_link'>,
    id: string,
    image_link: Express.Multer.File,
  ): Promise<Category> {
    try {
      const alreadyExists = await this.categoryRepository.findById(id);

      if (!alreadyExists) {
        throw new BadRequestException(`Category with ${id} id not found.`);
      }
      let objectUrl = alreadyExists.image_link;
      if (image_link) {
        objectUrl = await this.s3Upload.saveFile(image_link);
      }

      return await this.categoryRepository.update(payload, id, objectUrl);
    } catch (error) {
      if (error.message === 'Category not found') {
        throw new BadRequestException(`Category not found`);
      } else {
        throw error;
      }
    }
  }
}
