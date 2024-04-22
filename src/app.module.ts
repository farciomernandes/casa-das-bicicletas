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
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDataSource } from './infra/db/database.provider';
import { RoleController } from './presentation/controllers/role/role-controller';
import { CityModule } from './infra/ioc/city/city.module';
import { StateModule } from './infra/ioc/state/state.module';
import { AddressModule } from './infra/ioc/address/address.module';
import { UserModule } from './infra/ioc/user/user.module';
import { CategoryModule } from './infra/ioc/category/category.module';
import { AttributesModule } from './infra/ioc/attributes/attributes.module';
import { ProductModule } from './infra/ioc/product/product.module';
import { OrderModule } from './infra/ioc/order/order.module';
import { OrderItemModule } from './infra/ioc/order_item/order_item.module';

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
    RoleModule,
    StateModule,
    CityModule,
    AddressModule,
    UserModule,
    CategoryModule,
    ProductModule,
    AttributesModule,
    OrderModule,
    OrderItemModule,
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
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'api/v1/role', method: RequestMethod.PATCH });
  }
  constructor(private dataSource: DataSource) {}
}
