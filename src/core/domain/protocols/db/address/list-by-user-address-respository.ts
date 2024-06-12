import { AddressModelDto } from '@/presentation/dtos/address/address-model.dto';

export abstract class IDbListByUserAddressRepository {
  abstract getByUser(user_id:string): Promise<AddressModelDto[]>;
}
