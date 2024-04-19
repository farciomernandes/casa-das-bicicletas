import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbDeleteCategoryRepository } from '@/core/domain/protocols/db/category/delete-category-repository';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';

@Injectable()
export class DbDeleteCategory implements IDbDeleteCategoryRepository {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async delete(id: string): Promise<void> {
    const alreadyExists = await this.categoryRepository.findById(id);

    if (!alreadyExists) {
      throw new BadRequestException(`Category not found`);
    }
    await this.categoryRepository.delete(id);
  }
}
