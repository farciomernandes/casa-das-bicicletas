import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';
import { baseSchema } from '../base/base.schema';
import { SchemasEnum } from '../../schema.enum';
import { Role } from '@/core/domain/models/role.entity';

export const RoleSchema = new EntitySchema<Role>({
  schema: SchemasEnum.users,
  name: Role.name,
  target: Role,
  tableName: 'roles',
  columns: {
    ...baseSchema,
    value: {
      type: 'varchar',
      nullable: false,
    },
    label: {
      type: 'varchar',
      nullable: false,
    },
  },
});
