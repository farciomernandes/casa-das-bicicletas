import { Injectable } from '@nestjs/common';
import { Address } from '@/core/domain/models/address.entity';
import { AddressModelDto } from '@/presentation/dtos/address/address-model.dto';
import { IDbAddAddressRepository } from '../db/address/add-address-repository';
import { IDbListAddressRepository } from '../db/address/list-address-respository';
import { IDbUpdateAddressRepository } from '../db/address/update-address-repository';
import { IDbFindAddressByIdRepository } from '../db/address/find-address-by-id-repository';
import { IDbDeleteAddressRepository } from '../db/address/delete-address-repository';

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