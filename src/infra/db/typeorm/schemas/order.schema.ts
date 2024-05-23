import { EntitySchema } from 'typeorm';
import { baseSchema } from '../base/base.schema';
import { SchemasEnum } from '../../schema.enum';
import { User } from '@/core/domain/models/user.entity';
import { Order } from '@/core/domain/models/order.entity';
import { OrderItem } from '@/core/domain/models/order_item.entity';
import { Address } from '@/core/domain/models/address.entity';
import { Shipping } from '@/core/domain/models/shipping.entity';

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
      nullable: true,
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
    address_id: {
      type: 'uuid',
      nullable: true,
    },
    shippings_id: {
      type: 'uuid',
      nullable: true,
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
    order_items: {
      type: 'one-to-many',
      target: () => OrderItem,
      inverseSide: 'order',
      joinColumn: {
        name: 'order_id',
      },
    },
    shippings: {
      type: 'one-to-one',
      target: () => Shipping,
      joinColumn: {
        name: 'shippings_id',
        referencedColumnName: 'id',
      },
    },
    address: {
      type: 'many-to-one',
      target: () => Address,
      joinColumn: {
        name: 'address_id',
        referencedColumnName: 'id',
      },
    },
  },
});
