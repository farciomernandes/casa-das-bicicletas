import { Injectable } from '@nestjs/common';
import { Address } from '@/core/domain/models/address.entity';
import { AddressModelDto } from '@/presentation/dtos/address/address-model.dto';
import { IDbAddAddressRepository } from '../db/address/add-address-repository';
import { IDbListAddressRepository } from '../db/address/list-address-respository';
import { IDbUpdateAddressRepository } from '../db/address/update-address-repository';
import { IDbFindAddressByIdRepository } from '../db/address/find-address-by-id-repository';
import { IDbDeleteAddressRepository } from '../db/address/delete-address-repository';
import { UploadAddressDto } from '@/presentation/dtos/address/upload-address.dto';

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
  abstract getAll(): Promise<AddressModelDto[]>;
  abstract create(payload: any, user_id: string): Promise<AddressModelDto>;
  abstract delete(id: string): Promise<void>;
  abstract update(payload: UploadAddressDto, id: string): Promise<Address>;
}
