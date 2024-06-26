import { EntitySchema } from 'typeorm';
import { SchemasEnum } from '../../schema.enum';
import { OrderItem } from '@/core/domain/models/order_item.entity';
import { Order } from '@/core/domain/models/order.entity';
import { ProductVariables } from '@/core/domain/models/product_variables.entity';

export const OrderItemSchema = new EntitySchema<OrderItem>({
  schema: SchemasEnum.users,
  name: OrderItem.name,
  target: OrderItem,
  tableName: `order_items`,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      nullable: false,
    },
    quantity: {
      type: 'integer',
      nullable: false,
    },
    sub_total: {
      type: 'numeric',
      nullable: false,
    },
    order_id: {
      type: 'uuid',
      nullable: false,
    },
    product_variables_id: {
      type: 'uuid',
      nullable: false,
    },
    created_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      nullable: false,
    },
    updated_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      nullable: true,
    },
    deleted_at: {
      type: 'timestamp',
      nullable: true,
    },
  },
  relations: {
    order: {
      type: 'many-to-one',
      target: () => Order,
      joinColumn: {
        name: 'order_id',
        referencedColumnName: 'id',
      },
    },
    product_variables: {
      type: 'many-to-one',
      target: () => ProductVariables,
      joinColumn: {
        name: 'product_variables_id',
        referencedColumnName: 'id',
      },
    },
  },
});
