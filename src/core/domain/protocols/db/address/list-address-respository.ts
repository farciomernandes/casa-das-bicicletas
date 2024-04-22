import { AddressModelDto } from '@/presentation/dtos/address/address-model.dto';

export abstract class IDbListAddressRepository {
  abstract getAll(): Promise<AddressModelDto[]>;
}
