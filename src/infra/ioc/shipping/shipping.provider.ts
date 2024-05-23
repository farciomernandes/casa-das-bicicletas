import { DbAddShipping } from '@/core/application/shipping/db-add-shipping';
import { DbDeleteShipping } from '@/core/application/shipping/db-delete-shipping';
import { DbListShipping } from '@/core/application/shipping/db-list-shipping';
import { DbUpdateShipping } from '@/core/application/shipping/db-update-shipping';
import { ShippingCalculate } from '@/core/application/shipping/shipping-calculate';
import { Order } from '@/core/domain/models/order.entity';
import { Shipping } from '@/core/domain/models/shipping.entity';
import { IDbAddShippingRepository } from '@/core/domain/protocols/db/shipping/add-shipping-repository';
import { IDbDeleteShippingRepository } from '@/core/domain/protocols/db/shipping/delete-shipping-repository';
import { IDbListShippingRepository } from '@/core/domain/protocols/db/shipping/list-shipping-respository';
import { IDbUpdateShippingRepository } from '@/core/domain/protocols/db/shipping/update-shipping-repository';
import { IShippingService } from '@/core/domain/protocols/melhor-envio/melhor-envio-service';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { ShippingRepository } from '@/core/domain/protocols/repositories/shipping';
import { IShippingCalculate } from '@/core/domain/protocols/shipping/IShippingCalculate';
import { MelhorEnvioAdapter } from '@/infra/adapters/melhor-envio';
import { OrderTypeOrmRepository } from '@/infra/db/typeorm/repositories/order-typeorm.repository';
import { ShippingTypeOrmRepository } from '@/infra/db/typeorm/repositories/shipping-typeorm.repository';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const shippingProvider: Provider[] = [
  MelhorEnvioAdapter,
  DbListShipping,
  DbDeleteShipping,
  DbUpdateShipping,
  DbAddShipping,
  ShippingCalculate,
  {
    provide: ShippingTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new ShippingTypeOrmRepository(dataSource.getRepository(Shipping));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: ShippingRepository,
    useClass: ShippingTypeOrmRepository,
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
    provide: MelhorEnvioAdapter,
    useFactory: (configService: ConfigService): MelhorEnvioAdapter => {
      return new MelhorEnvioAdapter(configService);
    },
    inject: [ConfigService],
  },
  {
    provide: IShippingService,
    useClass: MelhorEnvioAdapter,
  },
  {
    provide: IDbListShippingRepository,
    useFactory: (shippingRepository: ShippingRepository): DbListShipping => {
      return new DbListShipping(shippingRepository);
    },
    inject: [ShippingTypeOrmRepository],
  },
  {
    provide: IDbUpdateShippingRepository,
    useFactory: (shippingRepository: ShippingRepository): DbUpdateShipping => {
      return new DbUpdateShipping(shippingRepository);
    },
    inject: [ShippingTypeOrmRepository],
  },
  {
    provide: IDbDeleteShippingRepository,
    useFactory: (shippingRepository: ShippingRepository): DbDeleteShipping => {
      return new DbDeleteShipping(shippingRepository);
    },
    inject: [ShippingTypeOrmRepository],
  },
  {
    provide: IDbAddShippingRepository,
    useFactory: (
      shippingRepository: ShippingRepository,
      orderRepository: OrderRepository,
    ): DbAddShipping => {
      return new DbAddShipping(shippingRepository, orderRepository);
    },
    inject: [ShippingTypeOrmRepository, OrderTypeOrmRepository],
  },
  {
    provide: IShippingCalculate,
    useFactory: (
      shippingService: IShippingService,
      orderRepository: OrderRepository,
    ): ShippingCalculate => {
      return new ShippingCalculate(shippingService, orderRepository);
    },
    inject: [MelhorEnvioAdapter, OrderTypeOrmRepository],
  },
];
