import { CategoryModelDto } from '@/presentation/dtos/category/category-model.dto';
import { Category } from '@/core/domain/models/category.entity';

export abstract class IDbUpdateCategoryRepository {
  abstract update(
    payload: Omit<CategoryModelDto, 'id'>,
    id: string,
  ): Promise<Category>;
}
