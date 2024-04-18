import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';
import { baseSchema } from '../base/base.schema';
import { SchemasEnum } from '../../schema.enum';
import { City } from '@/core/domain/models/city.entity';
import { State } from '@/core/domain/models/state.entity';

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
    state_id: {
      type: 'varchar',
      nullable: false,
    },
  },
  relations: {
    state: {
      type: 'many-to-one',
      target: () => State,
      joinColumn: {
        name: 'state_id',
        referencedColumnName: 'id',
      },
    },
  },
});
