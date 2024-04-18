import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';
import { baseSchema } from '../base/base.schema';
import { SchemasEnum } from '../../schema.enum';
import { City } from '@/core/domain/models/city.entity';

export const CitySchema = new EntitySchema<City>({
  schema: SchemasEnum.users,
  name: City.name,
  target: City,
  tableName: `cities`,
  columns: {
    ...baseSchema,
    name: {
      type: 'varchar',
      nullable: false,
    },
  },
});
