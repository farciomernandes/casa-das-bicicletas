import { Injectable } from '@nestjs/common';
import { Category } from '@/core/domain/models/category.entity';
import { CategoryModelDto } from '@/presentation/dtos/category/category-model.dto';
import { IDbListCategoryRepository } from '../db/category/list-category-respository';
import { IDbUpdateCategoryRepository } from '../db/category/update-category-repository';
import { IDbFindCategoryByIdRepository } from '../db/category/find-category-by-id-repository';
import { IDbDeleteCategoryRepository } from '../db/category/delete-category-repository';

@Injectable()
export abstract class CategoryRepository
  implements
    IDbListCategoryRepository,
    IDbUpdateCategoryRepository,
    IDbFindCategoryByIdRepository,
    IDbDeleteCategoryRepository
{
  abstract findById(id: string): Promise<Category>;
  abstract getAll(): Promise<Category[]>;
  abstract create(payload: Omit<CategoryModelDto, 'id'>): Promise<Category>;
  abstract delete(id: string): Promise<void>;
  abstract update(
    payload: Omit<CategoryModelDto, 'id'>,
    id: string,
  ): Promise<Category>;
}
