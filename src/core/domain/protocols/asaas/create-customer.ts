import { AddressModelDto } from '@/presentation/dtos/address/address-model.dto';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';

export abstract class AsaasCreateCustomer {
  abstract createCustomer(
    user: UserModelDto,
    address: AddressModelDto,
  ): Promise<string>;
}
