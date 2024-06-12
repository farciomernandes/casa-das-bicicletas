import { Module } from '@nestjs/common';
import { addressProvider } from './address.provider';
import { IDbAddAddressRepository } from '@/core/domain/protocols/db/address/add-address-repository';
import { IDbListAddressRepository } from '@/core/domain/protocols/db/address/list-address-respository';
import { IDbDeleteAddressRepository } from '@/core/domain/protocols/db/address/delete-address-repository';
import { IDbUpdateAddressRepository } from '@/core/domain/protocols/db/address/update-address-repository';
import { AddressController } from '@/presentation/controllers/address/address-controller';
import { AddressRepository } from '@/core/domain/protocols/repositories/address';
import { IDbListByUserAddressRepository } from '@/core/domain/protocols/db/address/list-by-user-address-respository';

@Module({
  imports: [],
  providers: [...addressProvider],
  controllers: [AddressController],
  exports: [
    IDbAddAddressRepository,
    IDbListAddressRepository,
    IDbListByUserAddressRepository,
    IDbDeleteAddressRepository,
    IDbUpdateAddressRepository,
    AddressRepository,
  ],
})
export class AddressModule {}
