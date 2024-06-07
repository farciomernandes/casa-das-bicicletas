import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { setEnvironment } from '@/infra/config/enviroments';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './infra/guards/roles.guard';
import { AuthMiddleware } from './infra/middleware/auth.middleware';
import { JwtAdapter } from './infra/adapters/jwt-adapter';
import { Decrypter } from './core/domain/protocols/cryptography/decrypter';
import { RoleModule } from './infra/ioc/role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDataSource } from './infra/db/database.provider';
import { RoleController } from './presentation/controllers/role/role-controller';
import { CityModule } from './infra/ioc/city/city.module';
import { StateModule } from './infra/ioc/state/state.module';
import { AddressModule } from './infra/ioc/address/address.module';
import { UserModule } from './infra/ioc/user/user.module';
import { CategoryModule } from './infra/ioc/category/category.module';
import { ProductVariablesModule } from './infra/ioc/product_variable/product_variables.module';
import { ProductModule } from './infra/ioc/product/product.module';
import { OrderModule } from './infra/ioc/order/order.module';
import { OrderItemModule } from './infra/ioc/order_item/order_item.module';
import { AuthModule } from './infra/ioc/auth/auth.module';
import { ShippingModule } from './infra/ioc/shipping/shipping.module';
import { HealthModule } from './infra/ioc/health.module';
import { ScheduleModule } from '@nestjs/schedule';
import { JobsModule } from './infra/ioc/jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: setEnvironment(),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        const dataSource = await TypeOrmDataSource.initialize();
        return dataSource;
      },
    }),
    ScheduleModule.forRoot(),
    JobsModule,
    HealthModule,
    AuthModule,
    RoleModule,
    StateModule,
    CityModule,
    AddressModule,
    UserModule,
    CategoryModule,
    ProductModule,
    ProductVariablesModule,
    OrderModule,
    OrderItemModule,
    ShippingModule,
  ],
  controllers: [RoleController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: Decrypter,
      useClass: JwtAdapter,
    },
  ],
})
export class AppModule implements NestModule {
  private readonly usersEndpoints = [
    { path: 'api/v1/users**', method: RequestMethod.PUT },
    { path: 'api/v1/users**', method: RequestMethod.GET },
    { path: 'api/v1/users**', method: RequestMethod.DELETE },
  ];

  private readonly shippingEndpoints = [
    { path: 'api/v1/shippings**', method: RequestMethod.PUT },
    { path: 'api/v1/shippings**', method: RequestMethod.POST },
    { path: 'api/v1/shippings**', method: RequestMethod.GET },
    { path: 'api/v1/shippings**', method: RequestMethod.DELETE },
  ];

  private readonly statesEndpoints = [
    { path: 'api/v1/states**', method: RequestMethod.PUT },
    { path: 'api/v1/states**', method: RequestMethod.DELETE },
  ];

  private readonly product_variableEndpoints = [
    { path: 'api/v1/product_variables', method: RequestMethod.POST },
    { path: 'api/v1/product_variables**', method: RequestMethod.PUT },
    { path: 'api/v1/product_variables**', method: RequestMethod.DELETE },
  ];

  private readonly order_itemEndpoints = [
    { path: 'api/v1/order_items', method: RequestMethod.POST },
    { path: 'api/v1/order_items', method: RequestMethod.GET },
    { path: 'api/v1/order_items**', method: RequestMethod.PUT },
    { path: 'api/v1/order_items**', method: RequestMethod.DELETE },
  ];

  private readonly orderEndpoints = [
    { path: 'api/v1/orders/checkout**', method: RequestMethod.POST },
    { path: 'api/v1/orders', method: RequestMethod.POST },
    { path: 'api/v1/orders', method: RequestMethod.GET },
    { path: 'api/v1/orders**', method: RequestMethod.PUT },
    { path: 'api/v1/orders**', method: RequestMethod.DELETE },
  ];

  private readonly cityEndpoints = [
    { path: 'api/v1/cities**', method: RequestMethod.PUT },
    { path: 'api/v1/cities**', method: RequestMethod.POST },
    { path: 'api/v1/cities**', method: RequestMethod.DELETE },
  ];

  private readonly addressEndpoints = [
    { path: 'api/v1/addresses', method: RequestMethod.POST },
    { path: 'api/v1/addresses**', method: RequestMethod.PUT },
    { path: 'api/v1/addresses**', method: RequestMethod.DELETE },
  ];

  private readonly userEndpoints = [
    { path: 'api/v1/users', method: RequestMethod.GET },
    { path: 'api/v1/users**', method: RequestMethod.PUT },
    { path: 'api/v1/users**', method: RequestMethod.DELETE },
  ];

  private readonly categoryEndpoints = [
    { path: 'api/v1/category', method: RequestMethod.POST },
    { path: 'api/v1/category', method: RequestMethod.PUT },
    { path: 'api/v1/category', method: RequestMethod.DELETE },
  ];

  private readonly productEndpoints = [
    { path: 'api/v1/product', method: RequestMethod.POST },
    { path: 'api/v1/product', method: RequestMethod.PUT },
    { path: 'api/v1/product', method: RequestMethod.DELETE },
  ];

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        ...this.orderEndpoints,
        ...this.cityEndpoints,
        ...this.addressEndpoints,
        ...this.userEndpoints,
        ...this.categoryEndpoints,
        ...this.productEndpoints,
        ...this.usersEndpoints,
        ...this.statesEndpoints,
        ...this.product_variableEndpoints,
        ...this.order_itemEndpoints,
        ...this.shippingEndpoints,
        { path: 'api/v1/role', method: RequestMethod.ALL },
      );
  }
}
