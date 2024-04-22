import { EntitySchema } from 'typeorm';
import { baseSchema } from '../base/base.schema';
import { SchemasEnum } from '../../schema.enum';
import { User } from '@/core/domain/models/user.entity';
import { Order } from '@/core/domain/models/order.entity';

export const OrderSchema = new EntitySchema<Order>({
  schema: SchemasEnum.users,
  name: Order.name,
  target: Order,
  tableName: `orders`,
  columns: {
    ...baseSchema,
    status: {
      type: 'enum',
      enum: ['PENDING', 'PAID', 'CANCELED'],
      nullable: false,
    },
    total: {
      type: 'numeric',
      nullable: false,
    },
    transaction_id: {
      type: 'varchar',
      nullable: true,
    },
    user_id: {
      type: 'uuid',
      nullable: false,
    },
    created_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      nullable: false,
    },
    deleted_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      nullable: false,
    },
    updated_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      nullable: false,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: () => User,
      joinColumn: {
        name: 'user_id',
        referencedColumnName: 'id',
      },
    },
  },
});
