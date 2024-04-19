import { Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { IDbDeleteAddressRepository } from '@/core/domain/protocols/db/address/delete-address-repository';
import { AddressRepository } from '@/core/domain/protocols/db/repositories/address';
import { IDbAddAddressRepository } from '@/core/domain/protocols/db/address/add-address-repository';
import { IDbListAddressRepository } from '@/core/domain/protocols/db/address/list-address-respository';
import { IDbUpdateAddressRepository } from '@/core/domain/protocols/db/address/update-address-repository';
import { DbListAddress } from '@/core/application/address/db-list-address';
import { CityRepository } from '@/core/domain/protocols/db/repositories/city';
import { CityTypeOrmRepository } from '@/infra/db/typeorm/repositories/city-typeorm.repository';
import { City } from '@/core/domain/models/city.entity';
import { DbAddAddress } from '@/core/application/address/db-add-address';
import { DbDeleteAddress } from '@/core/application/address/db-delete-address';
import { DbUpdateAddress } from '@/core/application/address/db-update-address';
import { Address } from '@/core/domain/models/address.entity';
import { AddressTypeOrmRepository } from '@/infra/db/typeorm/repositories/address-typeorm.repository';

export const addressProvider: Provider[] = [
  DbAddAddress,
  DbListAddress,
  DbDeleteAddress,
  DbUpdateAddress,
  {
    provide: AddressTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new AddressTypeOrmRepository(dataSource.getRepository(Address));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: AddressRepository,
    useClass: AddressTypeOrmRepository,
  },
  {
    provide: CityTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new CityTypeOrmRepository(dataSource.getRepository(City));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: CityRepository,
    useClass: CityTypeOrmRepository,
  },
  {
    provide: IDbAddAddressRepository,
    useFactory: (
      addressRepository: AddressRepository,
      cityRepository: CityRepository,
    ): DbAddAddress => {
      return new DbAddAddress(addressRepository, cityRepository);
    },
    inject: [AddressTypeOrmRepository, CityTypeOrmRepository],
  },
  {
    provide: IDbListAddressRepository,
    useFactory: (AddressRepository: AddressRepository): DbListAddress => {
      return new DbListAddress(AddressRepository);
    },
    inject: [AddressTypeOrmRepository],
  },
  {
    provide: IDbUpdateAddressRepository,
    useFactory: (AddressRepository: AddressRepository): DbUpdateAddress => {
      return new DbUpdateAddress(AddressRepository);
    },
    inject: [AddressTypeOrmRepository],
  },
  {
    provide: IDbDeleteAddressRepository,
    useFactory: (AddressRepository: AddressRepository): DbDeleteAddress => {
      return new DbDeleteAddress(AddressRepository);
    },
    inject: [AddressTypeOrmRepository],
  },
];
