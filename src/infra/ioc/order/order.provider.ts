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
import { IDbAddOrderItemRepository } from '@/core/domain/protocols/db/order_item/add-order_item-repository';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { ProductTypeOrmRepository } from '@/infra/db/typeorm/repositories/product-typeorm.repository';
import { Product } from '@/core/domain/models/product.entity';
import { OrderItemTypeOrmRepository } from '@/infra/db/typeorm/repositories/order_item-typeorm.repository';
import { OrderItem } from '@/core/domain/models/order_item.entity';
import { OrderItemRepository } from '@/core/domain/protocols/repositories/order_item';
import { DbAddOrderItem } from '@/core/application/order_item/db-add-order_item';
import { ICheckoutOrder } from '@/core/domain/protocols/payment/checkout-order';
import { CheckoutOrder } from '@/core/application/order/checkout-order';
import { IPaymentProcess } from '@/core/domain/protocols/asaas/payment-process';
import PaymentService from '@/infra/proxy/asaas/payment.service';
import { AxiosAdapter } from '@/infra/adapters/axios-adapter';
import { ConfigService } from '@nestjs/config';

export const orderProvider: Provider[] = [
  DbAddOrder,
  DbListOrder,
  DbDeleteOrder,
  DbUpdateOrder,
  DbAddOrderItem,
  CheckoutOrder,
  {
    provide: OrderTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new OrderTypeOrmRepository(dataSource.getRepository(Order));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: OrderRepository,
    useFactory: (dataSource: DataSource) => {
      const orderRepository = dataSource.getRepository(Order);
      return new OrderTypeOrmRepository(orderRepository);
    },
    inject: [getDataSourceToken()],
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
    provide: ProductTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new ProductTypeOrmRepository(dataSource.getRepository(Product));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: ProductRepository,
    useFactory: (dataSource: DataSource) => {
      const productRepository = dataSource.getRepository(Product);
      return new ProductTypeOrmRepository(productRepository);
    },
    inject: [getDataSourceToken()],
  },
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
    useFactory: (dataSource: DataSource) => {
      const orderItemRepository = dataSource.getRepository(OrderItem);
      return new OrderItemTypeOrmRepository(orderItemRepository);
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: AxiosAdapter,
    useFactory: (configService: ConfigService): AxiosAdapter => {
      return new AxiosAdapter(configService);
    },
    inject: [ConfigService],
  },
  {
    provide: PaymentService,
    useFactory: (axiosAdapter: AxiosAdapter): PaymentService => {
      return new PaymentService(axiosAdapter);
    },
    inject: [AxiosAdapter],
  },
  {
    provide: IPaymentProcess,
    useClass: PaymentService,
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
    provide: IDbAddOrderRepository,
    useFactory: (
      orderRepository: OrderRepository,
      userRepository: UserRepository,
      dbAddOrderItem: IDbAddOrderItemRepository,
      productRepository: ProductRepository,
    ): DbAddOrder => {
      return new DbAddOrder(
        orderRepository,
        userRepository,
        dbAddOrderItem,
        productRepository,
      );
    },
    inject: [
      OrderTypeOrmRepository,
      UserTypeOrmRepository,
      DbAddOrderItem,
      ProductTypeOrmRepository,
    ],
  },
  {
    provide: ICheckoutOrder,
    useFactory: (
      orderRepository: OrderRepository,
      userRepository: UserRepository,
      dbUpdateOrderItem: IDbUpdateOrderRepository,
      paymentService: IPaymentProcess,
    ): CheckoutOrder => {
      return new CheckoutOrder(
        orderRepository,
        userRepository,
        dbUpdateOrderItem,
        paymentService,
      );
    },
    inject: [
      OrderTypeOrmRepository,
      UserTypeOrmRepository,
      DbUpdateOrder,
      PaymentService,
    ],
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
