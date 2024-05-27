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
    const host = configService.get('CASA_DAS_BICICLETAS_DB_HOST');
    app.useGlobalFilters(new AllExceptionsFilter());
    LogServerStatus.logEnv({ currentEnv });

    const setupSwagger = (application: INestApplication) => {
      let swaggerRoute = '/';
      if (currentEnv !== 'production') {
        application.use(
          ['/docs', '/docs-json'],
          basicAuth({
            challenge: true,
            users: {
              [configService.get('CASA_DAS_BICICLETAS_SWAGGER_USERNAME')]:
                configService.get('CASA_DAS_BICICLETAS_SWAGGER_PASSWORD'),
            },
          }),
        );
        swaggerRoute = '/docs';
      }

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
    await app.listen(port);
    LogServerStatus.logSuccess({ isProduction: false, port, host });

    console.log(`App is running on http://localhost:${port} 🚀`);
  } catch (error) {
    LogServerStatus.logError({ error });
    console.error('Error starting the application:', error);
  }
}

bootstrap();
