import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './shared/filter/http-exception.filter';
import { LogServerStatus } from './shared/helpers/log-server-status';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);
    const currentEnv = configService.get('NODE_ENV') || 'dev';
    const host = configService.get('CASA_DAS_BICICLETAS_DB_HOST');
    app.useGlobalFilters(new AllExceptionsFilter());
    LogServerStatus.logEnv({ currentEnv });

    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    const port = configService.get('PORT') || 3000;
    await app.listen(port);
    LogServerStatus.logSuccess({ isProduction: false, port, host });

    console.log(`App is running on http://localhost:${port} 🚀`);
  } catch (error) {
    LogServerStatus.logError({ error });
    console.error('Error starting the application:', error);
  }
}

bootstrap();
