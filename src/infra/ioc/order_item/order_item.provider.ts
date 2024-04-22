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
import { ProductTypeOrmRepository } from '@/infra/db/typeorm/repositories/product-typeorm.repository';
import { Product } from '@/core/domain/models/product.entity';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { OrderTypeOrmRepository } from '@/infra/db/typeorm/repositories/order-typeorm.repository';
import { Order } from '@/core/domain/models/order.entity';

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
    provide: ProductTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new ProductTypeOrmRepository(dataSource.getRepository(Product));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: ProductRepository,
    useClass: ProductTypeOrmRepository,
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
      productRepository: ProductRepository,
      orderRepository: OrderRepository,
    ): DbAddOrderItem => {
      return new DbAddOrderItem(
        orderItemRepository,
        productRepository,
        orderRepository,
      );
    },
    inject: [
      OrderItemTypeOrmRepository,
      ProductTypeOrmRepository,
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
