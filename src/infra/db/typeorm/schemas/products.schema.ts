import { EntitySchema } from 'typeorm';
import { SchemasEnum } from '../../schema.enum';
import { Product } from '@/core/domain/models/product.entity';
import { Attributes } from '@/core/domain/models/attributes.entity';
import { Category } from '@/core/domain/models/category.entity';

export const ProductsSchema = new EntitySchema<Product>({
  schema: SchemasEnum.users,
  name: Product.name,
  target: Product,
  tableName: `products`,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      nullable: false,
    },
    name: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    description: {
      type: 'text',
      nullable: false,
    },
    large_description: {
      type: 'text',
      nullable: false,
    },
    price: {
      type: 'numeric',
      nullable: false,
    },
    installment_value: {
      type: 'integer',
      nullable: false,
    },
    installment_count: {
      type: 'integer',
      nullable: false,
    },
    discount_price: {
      type: 'numeric',
      nullable: false,
    },
    discount_percent: {
      type: 'numeric',
      nullable: false,
    },
    sku: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    category_id: {
      type: 'uuid',
      nullable: false,
    },
    created_date: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      nullable: false,
    },
    updated_date: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      nullable: false,
    },
  },
  relations: {
    category: {
      type: 'many-to-one',
      target: () => Category,
      joinColumn: { name: 'category_id' },
      eager: true,
    },
    attributes: {
      type: 'one-to-many',
      target: () => Attributes,
      inverseSide: 'product',
      eager: true,
    },
  },
});
