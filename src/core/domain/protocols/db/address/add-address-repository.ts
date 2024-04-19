import { Address } from '@/core/domain/models/address.entity';
import { AddressModelDto } from '@/presentation/dtos/address/address-model.dto';

export abstract class IDbAddAddressRepository {
  abstract create(payload: Omit<AddressModelDto, 'id'>): Promise<Address>;
}
