import { AddressModelDto } from '@/presentation/dtos/address/address-model.dto';

export abstract class IDbAddAddressRepository {
  abstract create(payload: any, user_id: string): Promise<AddressModelDto>;
}
