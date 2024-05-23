import { EntitySchema } from 'typeorm';
import { baseSchema } from '../base/base.schema';
import { SchemasEnum } from '../../schema.enum';
import { Shipping } from '@/core/domain/models/shipping.entity';

export const ShippingSchema = new EntitySchema<Shipping>({
  schema: SchemasEnum.users,
  name: Shipping.name,
  target: Shipping,
  tableName: `shippings`,
  columns: {
    ...baseSchema,
    name: {
      type: 'varchar',
      nullable: false,
    },
    status: {
      type: 'enum',
      enum: ['PROCESSING', 'SENT'],
      default: 'PROCESSING',
      nullable: false,
    },
    price: {
      type: 'numeric',
      nullable: false,
    },
    max_delivery_time: {
      type: 'integer',
      nullable: false,
    },
    min_delivery_time: {
      type: 'integer',
      nullable: false,
    },
    company_name: {
      type: 'varchar',
      nullable: false,
    },
    company_picture: {
      type: 'varchar',
      nullable: false,
    },
    created_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      nullable: false,
    },
    deleted_at: {
      type: 'timestamp',
      default: null,
      nullable: true,
    },
    updated_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
      nullable: false,
    },
  },
});
