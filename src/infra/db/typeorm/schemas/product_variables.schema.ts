import { EntitySchema } from 'typeorm';
import { SchemasEnum } from '@/infra/db/schema.enum';
import { ProductVariables } from '@/core/domain/models/product_variables.entity';

export const ProductVariablesSchema = new EntitySchema<ProductVariables>({
  schema: SchemasEnum.users,
  name: ProductVariables.name,
  target: ProductVariables,
  tableName: `product_variables`,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    color: {
      type: 'varchar',
    },
    quantity: {
      type: 'int',
    },
    size: {
      type: 'varchar',
    },
    image_link: {
      type: 'varchar',
      nullable: false,
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
    },
    updated_at: {
      type: 'timestamp',
      updateDate: true,
    },
    product_id: {
      type: 'uuid',
      nullable: false,
    },
    type: {
      type: 'varchar',
    },
    weight: {
      type: 'int',
    },
    format: {
      type: 'varchar',
    },
    length: {
      type: 'int',
    },
    height: {
      type: 'int',
    },
    width: {
      type: 'int',
    },
    diameter: {
      type: 'int',
    },
  },
  relations: {
    product: {
      type: 'many-to-one',
      target: 'Product',
      joinColumn: { name: 'product_id' },
    },
  },
});
