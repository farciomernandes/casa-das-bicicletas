import { IDbListCategoryRepository } from '@/core/domain/protocols/db/category/list-category-respository';
import { Injectable } from '@nestjs/common';
import { Category } from '@/core/domain/models/category.entity';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';

@Injectable()
export class DbListCategory implements IDbListCategoryRepository {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.getAll();
  }
}
