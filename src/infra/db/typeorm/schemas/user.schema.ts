// UserSchema.ts
import { EntitySchema } from 'typeorm';
import { baseSchema } from '../base/base.schema';
import { SchemasEnum } from '../../schema.enum';
import { User } from '@/core/domain/models/user.entity';
import { Address } from '@/core/domain/models/address.entity';

export const UserSchema = new EntitySchema<User>({
  schema: SchemasEnum.users,
  name: User.name,
  target: User,
  tableName: 'users',
  columns: {
    ...baseSchema,
    email: {
      type: 'varchar',
      nullable: false,
    },
    password: {
      type: 'varchar',
      nullable: false,
    },
    name: {
      type: 'varchar',
      nullable: false,
    },
    cpf: {
      type: 'varchar',
      nullable: false,
    },
    document: {
      type: 'varchar',
      nullable: false,
    },
    sex: {
      type: 'varchar',
      nullable: false,
    },
    birthdate: {
      type: 'varchar',
      nullable: false,
    },
    phone: {
      type: 'varchar',
      nullable: false,
    },
    role_id: {
      type: 'uuid',
      nullable: true,
    },
  },
  relations: {
    role: {
      type: 'many-to-one',
      target: 'Role',
      joinColumn: { name: 'role_id' },
      eager: true,
    },
    addresses: {
      type: 'one-to-many',
      target: () => Address,
      inverseSide: 'user',
      lazy: true,
    },
  },
});
