import { AddressModelDto } from '@/presentation/dtos/address/address-model.dto';
import { PaymentDataDto } from '@/presentation/dtos/checkout/process-payment.dto';
import { OrderModel } from '@/presentation/dtos/order/order-model.dto';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';

export abstract class AsaasCreateTransaction {
  abstract createTransaction(
    user_id: string,
    order: OrderModel,
    user: UserModelDto,
    payment: PaymentDataDto,
    address: AddressModelDto,
  ): Promise<{
    transactionId: string;
    gatewayStatus: string;
  }>;
}
