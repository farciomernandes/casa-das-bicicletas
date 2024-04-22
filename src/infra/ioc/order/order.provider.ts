import { Provider } from '@nestjs/common';
import { DbAddOrder } from '@/core/application/order/db-add-order';
import { OrderTypeOrmRepository } from '../../db/typeorm/repositories/order-typeorm.repository';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { IDbDeleteOrderRepository } from '@/core/domain/protocols/db/order/delete-order-repository';
import { IDbAddOrderRepository } from '@/core/domain/protocols/db/order/add-order-repository';
import { IDbListOrderRepository } from '@/core/domain/protocols/db/order/list-order-respository';
import { IDbUpdateOrderRepository } from '@/core/domain/protocols/db/order/update-order-repository';
import { DbListOrder } from '@/core/application/order/db-list-order';
import { DbDeleteOrder } from '@/core/application/order/db-delete-order';
import { DbUpdateOrder } from '@/core/application/order/db-update-order';
import { Order } from '@/core/domain/models/order.entity';
import { UserTypeOrmRepository } from '@/infra/db/typeorm/repositories/user-typeorm.repository';
import { User } from '@/core/domain/models/user.entity';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { UserRepository } from '@/core/domain/protocols/repositories/user';

export const orderProvider: Provider[] = [
  DbAddOrder,
  DbListOrder,
  DbDeleteOrder,
  DbUpdateOrder,
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
    provide: UserTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new UserTypeOrmRepository(dataSource.getRepository(User));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: UserRepository,
    useClass: UserTypeOrmRepository,
  },
  {
    provide: IDbAddOrderRepository,
    useFactory: (
      orderRepository: OrderRepository,
      userRepository: UserRepository,
    ): DbAddOrder => {
      return new DbAddOrder(orderRepository, userRepository);
    },
    inject: [OrderTypeOrmRepository, UserTypeOrmRepository],
  },
  {
    provide: IDbListOrderRepository,
    useFactory: (orderRepository: OrderRepository): DbListOrder => {
      return new DbListOrder(orderRepository);
    },
    inject: [OrderTypeOrmRepository],
  },
  {
    provide: IDbUpdateOrderRepository,
    useFactory: (orderRepository: OrderRepository): DbUpdateOrder => {
      return new DbUpdateOrder(orderRepository);
    },
    inject: [OrderTypeOrmRepository],
  },
  {
    provide: IDbDeleteOrderRepository,
    useFactory: (orderRepository: OrderRepository): DbDeleteOrder => {
      return new DbDeleteOrder(orderRepository);
    },
    inject: [OrderTypeOrmRepository],
  },
];
