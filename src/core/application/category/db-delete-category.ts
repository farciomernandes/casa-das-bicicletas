import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbDeleteCategoryRepository } from '@/core/domain/protocols/db/category/delete-category-repository';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';
import { S3DeleteImage } from '@/core/domain/protocols/aws/s3-delete-image';

@Injectable()
export class DbDeleteCategory implements IDbDeleteCategoryRepository {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly s3Delete: S3DeleteImage,
  ) {}

  async delete(id: string): Promise<void> {
    try {
      const category = await this.categoryRepository.findById(id);

      if (!category) {
        throw new BadRequestException(`Category not found`);
      }

      await this.s3Delete.deleteBucket(category.image_link);
      await this.categoryRepository.delete(id);
    } catch (error) {
      console.log('Error deleting category:', error);
      throw error;
    }
  }
}
