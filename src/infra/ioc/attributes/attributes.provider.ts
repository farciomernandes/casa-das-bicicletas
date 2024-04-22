import { Provider } from '@nestjs/common';
import { AttributesTypeOrmRepository } from '../../db/typeorm/repositories/attributes-typeorm.repository';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { IDbDeleteAttributesRepository } from '@/core/domain/protocols/db/attributes/delete-attributes-repository';
import { IDbAddAttributesRepository } from '@/core/domain/protocols/db/attributes/add-attributes-repository';
import { IDbListAttributesRepository } from '@/core/domain/protocols/db/attributes/list-attributes-respository';
import { IDbUpdateAttributesRepository } from '@/core/domain/protocols/db/attributes/update-attributes-repository';
import { Attributes } from '@/core/domain/models/attributes.entity';
import { DbListAttributes } from '@/core/application/attributes/db-list-attributes';
import { DbDeleteAttributes } from '@/core/application/attributes/db-delete-attributes';
import { DbAddAttributes } from '@/core/application/attributes/db-add-attributes';
import { AttributesRepository } from '@/core/domain/protocols/repositories/attributes';
import { DbUpdateAttributes } from '@/core/application/attributes/db-update-attributes';

export const attributesProvider: Provider[] = [
  DbAddAttributes,
  DbListAttributes,
  DbDeleteAttributes,
  DbUpdateAttributes,
  {
    provide: AttributesTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new AttributesTypeOrmRepository(
        dataSource.getRepository(Attributes),
      );
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: AttributesRepository,
    useClass: AttributesTypeOrmRepository,
  },
  {
    provide: IDbAddAttributesRepository,
    useClass: DbAddAttributes,
  },
  {
    provide: IDbAddAttributesRepository,
    useFactory: (
      attributesRepository: AttributesRepository,
    ): DbAddAttributes => {
      return new DbAddAttributes(attributesRepository);
    },
    inject: [AttributesTypeOrmRepository],
  },
  {
    provide: IDbListAttributesRepository,
    useFactory: (
      attributesRepository: AttributesRepository,
    ): DbListAttributes => {
      return new DbListAttributes(attributesRepository);
    },
    inject: [AttributesTypeOrmRepository],
  },
  {
    provide: IDbUpdateAttributesRepository,
    useFactory: (
      attributesRepository: AttributesRepository,
    ): DbUpdateAttributes => {
      return new DbUpdateAttributes(attributesRepository);
    },
    inject: [AttributesTypeOrmRepository],
  },
  {
    provide: IDbDeleteAttributesRepository,
    useFactory: (
      attributesRepository: AttributesRepository,
    ): DbDeleteAttributes => {
      return new DbDeleteAttributes(attributesRepository);
    },
    inject: [AttributesTypeOrmRepository],
  },
];
