import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';
import { SchemasEnum } from '../../schema.enum';
import { Category } from '@/core/domain/models/category.entity';
import { baseSchema } from '../base/base.schema';

export const CategorySchema = new EntitySchema<Category>({
  schema: SchemasEnum.users,
  name: Category.name,
  target: Category,
  tableName: `categories`,
  columns: {
    ...baseSchema,
    name: {
      type: 'varchar',
      nullable: false,
    },
    image_link: {
      type: 'varchar',
      nullable: false,
    },
    description: {
      type: 'varchar',
      nullable: false,
    },
  },
});
