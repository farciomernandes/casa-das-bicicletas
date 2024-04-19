import { Module } from '@nestjs/common';
import { AddressRepository } from '@/core/domain/protocols/db/repositories/address';
import { addressProvider } from './address.provider';
import { IDbAddAddressRepository } from '@/core/domain/protocols/db/address/add-address-repository';
import { IDbListAddressRepository } from '@/core/domain/protocols/db/address/list-address-respository';
import { IDbDeleteAddressRepository } from '@/core/domain/protocols/db/address/delete-address-repository';
import { IDbUpdateAddressRepository } from '@/core/domain/protocols/db/address/update-address-repository';
import { AddressController } from '@/presentation/controllers/address/address-controller';

@Module({
  imports: [],
  providers: [...addressProvider],
  controllers: [AddressController],
  exports: [
    IDbAddAddressRepository,
    IDbListAddressRepository,
    IDbDeleteAddressRepository,
    IDbUpdateAddressRepository,
    AddressRepository,
  ],
})
export class AddressModule {}
