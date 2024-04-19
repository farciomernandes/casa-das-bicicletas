import { Provider } from '@nestjs/common';
import { CategoryTypeOrmRepository } from '../../db/typeorm/repositories/category-typeorm.repository';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { IDbDeleteCategoryRepository } from '@/core/domain/protocols/db/category/delete-category-repository';
import { IDbListCategoryRepository } from '@/core/domain/protocols/db/category/list-category-respository';
import { IDbUpdateCategoryRepository } from '@/core/domain/protocols/db/category/update-category-repository';
import { Category } from '@/core/domain/models/category.entity';
import { DbListCategory } from '@/core/application/category/db-list-category';
import { DbDeleteCategory } from '@/core/application/category/db-delete-category';
import { DbUpdateCategory } from '@/core/application/category/db-update-category';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';

export const categoryProvider: Provider[] = [
  DbListCategory,
  DbDeleteCategory,
  DbUpdateCategory,
  {
    provide: CategoryTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new CategoryTypeOrmRepository(dataSource.getRepository(Category));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: CategoryRepository,
    useClass: CategoryTypeOrmRepository,
  },
  {
    provide: IDbListCategoryRepository,
    useFactory: (CategoryRepository: CategoryRepository): DbListCategory => {
      return new DbListCategory(CategoryRepository);
    },
    inject: [CategoryTypeOrmRepository],
  },
  {
    provide: IDbUpdateCategoryRepository,
    useFactory: (CategoryRepository: CategoryRepository): DbUpdateCategory => {
      return new DbUpdateCategory(CategoryRepository);
    },
    inject: [CategoryTypeOrmRepository],
  },
  {
    provide: IDbDeleteCategoryRepository,
    useFactory: (CategoryRepository: CategoryRepository): DbDeleteCategory => {
      return new DbDeleteCategory(CategoryRepository);
    },
    inject: [CategoryTypeOrmRepository],
  },
];
