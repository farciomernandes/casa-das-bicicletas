import { Category } from '@/core/domain/models/category.entity';
import { CategoryModelDto } from '@/presentation/dtos/category/category-model.dto';

export abstract class IDbAddCategoryRepository {
  abstract create(payload: Omit<CategoryModelDto, 'id'>): Promise<Category>;
}
