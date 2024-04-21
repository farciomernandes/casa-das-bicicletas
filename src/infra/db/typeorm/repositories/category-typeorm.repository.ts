import { Repository } from 'typeorm';
import { Category } from '@/core/domain/models/category.entity';
import { CategoryModelDto } from '@/presentation/dtos/category/category-model.dto';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';

export class CategoryTypeOrmRepository implements CategoryRepository {
  constructor(private readonly categoryRepository: Repository<Category>) {}
  async findByName(name: string): Promise<Category> {
    return this.categoryRepository.findOne({ where: { name } });
  }
  async update(
    payload: Omit<CategoryModelDto, 'id'>,
    id: string,
  ): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOneOrFail({
        where: { id },
      });

      this.categoryRepository.merge(category, payload);
      return this.categoryRepository.save(category);
    } catch (error) {
      throw new Error('Category not found');
    }
  }

  async findById(id: string): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async create(payload: Omit<Category, 'id'>): Promise<Category> {
    const category = this.categoryRepository.create(payload);
    return this.categoryRepository.save(category);
  }
}
