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
import { RoleModule } from './infra/ioc/role.module';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDataSource } from './infra/db/database.provider';
import { RoleController } from './presentation/controllers/role/role-controller';

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
      .forRoutes({ path: 'api/v1/role', method: RequestMethod.DELETE });
  }
  constructor(private dataSource: DataSource) {}
}
