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
import { AxiosAdapter } from '@/infra/adapters/axios-adapter';
import { ConfigService } from '@nestjs/config';
import AsaasPaymentService from '@/infra/proxy/asaas/payment.service';
import { ProductVariablesTypeOrmRepository } from '@/infra/db/typeorm/repositories/product_variables-typeorm.repository';
import { ProductVariables } from '@/core/domain/models/product_variables.entity';
import { ProductVariablesRepository } from '@/core/domain/protocols/repositories/product_variable';
import { DbFindOrderById } from '@/core/application/order/db-find-order-by-id';
import { IDbFindOrderByIdRepository } from '@/core/domain/protocols/db/order/find-order-by-id-repository';

export const orderProvider: Provider[] = [
  DbAddOrder,
  DbListOrder,
  DbDeleteOrder,
  DbUpdateOrder,
  DbAddOrderItem,
  DbFindOrderById,
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
    provide: ProductVariablesTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new ProductVariablesTypeOrmRepository(
        dataSource.getRepository(ProductVariables),
      );
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
    provide: ProductTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new ProductTypeOrmRepository(dataSource.getRepository(Product));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: ProductVariablesRepository,
    useFactory: (dataSource: DataSource) => {
      const ProductVariablesRepository =
        dataSource.getRepository(ProductVariables);
      return new ProductVariablesTypeOrmRepository(ProductVariablesRepository);
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
    provide: AsaasPaymentService,
    useFactory: (axiosAdapter: AxiosAdapter): AsaasPaymentService => {
      return new AsaasPaymentService(axiosAdapter);
    },
    inject: [AxiosAdapter],
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
    provide: IDbFindOrderByIdRepository,
    useFactory: (orderRepository: OrderRepository): DbFindOrderById => {
      return new DbFindOrderById(orderRepository);
    },
    inject: [OrderTypeOrmRepository],
  },
  {
    provide: IDbAddOrderRepository,
    useFactory: (
      orderRepository: OrderRepository,
      userRepository: UserRepository,
      dbAddOrderItem: IDbAddOrderItemRepository,
      productRepository: ProductRepository,
      productVariablesRepository: ProductVariablesRepository,
    ): DbAddOrder => {
      return new DbAddOrder(
        orderRepository,
        userRepository,
        dbAddOrderItem,
        productRepository,
        productVariablesRepository,
      );
    },
    inject: [
      OrderTypeOrmRepository,
      UserTypeOrmRepository,
      DbAddOrderItem,
      ProductTypeOrmRepository,
      ProductVariablesTypeOrmRepository,
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
      AsaasPaymentService,
    ],
  },
  {
    provide: IPaymentProcess,
    useClass: AsaasPaymentService,
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
    useFactory: (
      orderRepository: OrderRepository,
      productVariablesRepository: ProductVariablesRepository,
    ): DbUpdateOrder => {
      return new DbUpdateOrder(orderRepository, productVariablesRepository);
    },
    inject: [OrderTypeOrmRepository, ProductVariablesTypeOrmRepository],
  },
  {
    provide: IDbDeleteOrderRepository,
    useFactory: (orderRepository: OrderRepository): DbDeleteOrder => {
      return new DbDeleteOrder(orderRepository);
    },
    inject: [OrderTypeOrmRepository],
  },
];
