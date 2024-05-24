import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';
import { join } from 'path';
import { Env } from '../config/enviroments';

export const TypeOrmDataSource = new DataSource({
  type: 'postgres',
  host: Env.CASA_DAS_BICICLETAS_DB_HOST,
  port: Number(Env.CASA_DAS_BICICLETAS_DB_PORT),
  username: Env.CASA_DAS_BICICLETAS_DB_USERNAME,
  password: Env.CASA_DAS_BICICLETAS_DB_PASSWORD,
  database: Env.CASA_DAS_BICICLETAS_DB_NAME,
  synchronize: false,
  logger: 'advanced-console',
  entities: [join(__dirname, 'typeorm/schemas/*.schema.{js,ts}')],
  migrationsTableName: 'migrations',
  migrations: [join(__dirname, 'typeorm/migrations/*.{js,ts}')],
  namingStrategy: new SnakeNamingStrategy(),
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
