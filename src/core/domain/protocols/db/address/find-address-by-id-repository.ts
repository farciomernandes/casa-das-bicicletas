import { Address } from '@/core/domain/models/address.entity';

export abstract class IDbFindAddressByIdRepository {
  abstract findById(id: string): Promise<Address>;
}
