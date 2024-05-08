import { EntitySchema } from 'typeorm';
import { baseSchema } from '../base/base.schema';
import { SchemasEnum } from '../../schema.enum';
import { Address } from '@/core/domain/models/address.entity';
import { City } from '@/core/domain/models/city.entity';
import { User } from '@/core/domain/models/user.entity';

export const AddressSchema = new EntitySchema<Address>({
  schema: SchemasEnum.users,
  name: Address.name,
  target: Address,
  tableName: 'addresses',
  columns: {
    ...baseSchema,
    zip_code: {
      type: 'varchar',
      nullable: false,
    },
    street: {
      type: 'varchar',
      nullable: false,
    },
    number: {
      type: 'varchar',
      nullable: false,
    },
    complement: {
      type: 'varchar',
      nullable: true,
    },
    neighborhood: {
      type: 'varchar',
      nullable: false,
    },
    city_id: {
      type: 'uuid',
      nullable: false,
    },
    user_id: {
      type: 'uuid',
      nullable: false,
    },
  },
  relations: {
    city: {
      type: 'many-to-one',
      target: () => City,
      joinColumn: { name: 'city_id' },
      eager: true,
    },
    user: {
      type: 'many-to-one',
      target: () => User,
      joinColumn: { name: 'user_id' },
      eager: true,
    },
  },
});
