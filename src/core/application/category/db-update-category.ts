import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbUpdateCategoryRepository } from '@/core/domain/protocols/db/category/update-category-repository';
import { CategoryModelDto } from '@/presentation/dtos/category/category-model.dto';
import { Category } from '@/core/domain/models/category.entity';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';

@Injectable()
export class DbUpdateCategory implements IDbUpdateCategoryRepository {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async update(
    payload: Omit<CategoryModelDto, 'id'>,
    id: string,
  ): Promise<Category> {
    try {
      return await this.categoryRepository.update(payload, id);
    } catch (error) {
      if (error.message === 'Category not found') {
        throw new BadRequestException(`Category not found`);
      } else {
        throw error;
      }
    }
  }
}
