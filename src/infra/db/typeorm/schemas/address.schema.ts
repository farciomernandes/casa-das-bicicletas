import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';
import { baseSchema } from '../base/base.schema';
import { SchemasEnum } from '../../schema.enum';
import { Address } from '@/core/domain/models/address.entity';
import { City } from '@/core/domain/models/city.entity'; // Importando a entidade de cidade
import { State } from '@/core/domain/models/state.entity'; // Importando a entidade de estado

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
    state_id: {
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
    state: {
      type: 'many-to-one',
      target: () => State,
      joinColumn: { name: 'state_id' },
      eager: true,
    },
  },
});
