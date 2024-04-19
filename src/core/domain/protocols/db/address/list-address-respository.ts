import { Address } from '@/core/domain/models/address.entity';

export abstract class IDbListAddressRepository {
  abstract getAll(): Promise<Address[]>;
}
