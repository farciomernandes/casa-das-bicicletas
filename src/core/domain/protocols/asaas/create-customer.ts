import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';

export abstract class AsaasCreateCustomer {
  abstract createCustomer(user: UserModelDto): Promise<string>;
}
