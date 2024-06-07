import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './shared/filter/http-exception.filter';
import * as cors from 'cors';
import { LogServerStatus } from './shared/helpers/log-server-status';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const currentEnv = configService.get('NODE_ENV') || 'dev';
    const isProduction = currentEnv === 'production';
    const host = app.getHttpServer().address()?.address || 'localhost';
    const swaggerBasePath = isProduction ? '/casa-das-bicicletas2' : '';

    app.useGlobalFilters(new AllExceptionsFilter());
    LogServerStatus.logEnv({ currentEnv });

    const setupSwagger = (application: INestApplication) => {
      const swaggerRoute = `${swaggerBasePath}/docs`;
      application.use(
        [swaggerRoute, `${swaggerBasePath}/docs-json`],
        basicAuth({
          challenge: true,
          users: {
            [configService.get('CASA_DAS_BICICLETAS_SWAGGER_USERNAME')]:
              configService.get('CASA_DAS_BICICLETAS_SWAGGER_PASSWORD'),
          },
        }),
      );

      const config = new DocumentBuilder()
        .setTitle(configService.get('CASA_DAS_BICICLETAS_SWAGGER_TITLE'))
        .setDescription(
          configService.get('CASA_DAS_BICICLETAS_SWAGGER_DESCRIPTION'),
        )
        .setVersion(configService.get('CASA_DAS_BICICLETAS_SWAGGER_VERSION'))
        .addBearerAuth()
        .build();

      const document = SwaggerModule.createDocument(application, config);
      SwaggerModule.setup(swaggerRoute, application, document);
    };

    app.use(cors());
    app.useGlobalPipes(new ValidationPipe());
    setupSwagger(app);

    const port = configService.get('CASA_DAS_BICICLETAS_PORT') || 3000;
    await app.listen(port, '0.0.0.0');
    LogServerStatus.logSuccess({ port, host });
  } catch (error) {
    LogServerStatus.logError({ error });
    console.error('Error starting the application:', error);
  }
}

bootstrap();
