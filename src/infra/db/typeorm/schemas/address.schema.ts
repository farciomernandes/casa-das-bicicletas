import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';
import { baseSchema } from '../base/base.schema';
import { SchemasEnum } from '../../schema.enum';
import { Address } from '@/core/domain/models/address.entity';

export const AddressSchema = new EntitySchema<Address>({
  schema: SchemasEnum.users,
  name: Address.name,
  target: Address,
  tableName: `addresses`,
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
  },
  relations: {
    city: {
      type: 'many-to-one',
      target: 'City',
      joinColumn: { name: 'city_id' },
      eager: true,
    },
  },
});
