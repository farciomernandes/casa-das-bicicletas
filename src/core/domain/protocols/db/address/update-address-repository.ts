import { AddressModelDto } from '@/presentation/dtos/address/address-model.dto';
import { Address } from '@/core/domain/models/address.entity';

export abstract class IDbUpdateAddressRepository {
  abstract update(
    payload: Omit<AddressModelDto, 'id'>,
    id: string,
  ): Promise<Address>;
}
