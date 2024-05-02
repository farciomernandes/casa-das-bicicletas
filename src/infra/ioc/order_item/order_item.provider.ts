import { Provider } from '@nestjs/common';
import { OrderItemTypeOrmRepository } from '../../db/typeorm/repositories/order_item-typeorm.repository';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { IDbDeleteOrderItemRepository } from '@/core/domain/protocols/db/order_item/delete-order_item-repository';
import { IDbAddOrderItemRepository } from '@/core/domain/protocols/db/order_item/add-order_item-repository';
import { IDbListOrderItemRepository } from '@/core/domain/protocols/db/order_item/list-order_item-respository';
import { IDbUpdateOrderItemRepository } from '@/core/domain/protocols/db/order_item/update-order_item-repository';
import { OrderItem } from '@/core/domain/models/order_item.entity';
import { DbListOrderItem } from '@/core/application/order_item/db-list-order_item';
import { DbDeleteOrderItem } from '@/core/application/order_item/db-delete-order_item';
import { DbUpdateOrderItem } from '@/core/application/order_item/db-update-order_item';
import { DbAddOrderItem } from '@/core/application/order_item/db-add-order_item';
import { OrderItemRepository } from '@/core/domain/protocols/repositories/order_item';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { OrderTypeOrmRepository } from '@/infra/db/typeorm/repositories/order-typeorm.repository';
import { Order } from '@/core/domain/models/order.entity';
import { ProductVariablesRepository } from '@/core/domain/protocols/repositories/product_variable';
import { ProductVariablesTypeOrmRepository } from '@/infra/db/typeorm/repositories/product_variables-typeorm.repository';
import { ProductVariables } from '@/core/domain/models/product_variables.entity';

export const orderItemProvider: Provider[] = [
  DbAddOrderItem,
  DbListOrderItem,
  DbDeleteOrderItem,
  DbUpdateOrderItem,
  {
    provide: OrderItemTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new OrderItemTypeOrmRepository(
        dataSource.getRepository(OrderItem),
      );
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: OrderItemRepository,
    useClass: OrderItemTypeOrmRepository,
  },
  {
    provide: ProductVariablesTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new ProductVariablesTypeOrmRepository(
        dataSource.getRepository(ProductVariables),
      );
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: ProductVariablesRepository,
    useClass: ProductVariablesTypeOrmRepository,
  },
  {
    provide: OrderTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new OrderTypeOrmRepository(dataSource.getRepository(Order));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: OrderRepository,
    useClass: OrderTypeOrmRepository,
  },
  {
    provide: IDbAddOrderItemRepository,
    useClass: DbAddOrderItem,
  },
  {
    provide: IDbAddOrderItemRepository,
    useFactory: (
      orderItemRepository: OrderItemRepository,
      productVariablesRepository: ProductVariablesRepository,
      orderRepository: OrderRepository,
    ): DbAddOrderItem => {
      return new DbAddOrderItem(
        orderItemRepository,
        productVariablesRepository,
        orderRepository,
      );
    },
    inject: [
      OrderItemTypeOrmRepository,
      ProductVariablesTypeOrmRepository,
      OrderTypeOrmRepository,
    ],
  },
  {
    provide: IDbListOrderItemRepository,
    useFactory: (orderItemRepository: OrderItemRepository): DbListOrderItem => {
      return new DbListOrderItem(orderItemRepository);
    },
    inject: [OrderItemTypeOrmRepository],
  },
  {
    provide: IDbUpdateOrderItemRepository,
    useFactory: (
      orderItemRepository: OrderItemRepository,
    ): DbUpdateOrderItem => {
      return new DbUpdateOrderItem(orderItemRepository);
    },
    inject: [OrderItemTypeOrmRepository],
  },
  {
    provide: IDbDeleteOrderItemRepository,
    useFactory: (
      orderItemRepository: OrderItemRepository,
    ): DbDeleteOrderItem => {
      return new DbDeleteOrderItem(orderItemRepository);
    },
    inject: [OrderItemTypeOrmRepository],
  },
];
