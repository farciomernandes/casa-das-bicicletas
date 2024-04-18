import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';
import { baseSchema } from '../base/base.schema';
import { SchemasEnum } from '../../schema.enum';
import { State } from '@/core/domain/models/state.entity';

export const StateSchema = new EntitySchema<State>({
  schema: SchemasEnum.users,
  name: State.name,
  target: State,
  tableName: `${SchemasEnum.users}.states`,
  columns: {
    ...baseSchema,
    name: {
      type: 'varchar',
      nullable: false,
    },
  },
});
