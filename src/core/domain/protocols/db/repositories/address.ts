import { Injectable } from '@nestjs/common';
import { IDbListAddressRepository } from '../address/list-address-respository';
import { IDbAddAddressRepository } from '../address/add-address-repository';
import { Address } from '@/core/domain/models/address.entity';
import { IDbUpdateAddressRepository } from '../address/update-address-repository';
import { IDbFindAddressByIdRepository } from '../address/find-address-by-id-repository';
import { IDbDeleteAddressRepository } from '../address/delete-address-repository';
import { AddressModelDto } from '@/presentation/dtos/address/address-model.dto';

@Injectable()
export abstract class AddressRepository
  implements
    IDbAddAddressRepository,
    IDbListAddressRepository,
    IDbUpdateAddressRepository,
    IDbFindAddressByIdRepository,
    IDbDeleteAddressRepository
{
  abstract findById(id: string): Promise<Address>;
  abstract getAll(): Promise<Address[]>;
  abstract create(payload: Omit<AddressModelDto, 'id'>): Promise<Address>;
  abstract delete(id: string): Promise<void>;
  abstract update(
    payload: Omit<AddressModelDto, 'id'>,
    id: string,
  ): Promise<Address>;
}
