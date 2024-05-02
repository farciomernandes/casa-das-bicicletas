import { PaymentDataDto } from '@/presentation/dtos/checkout/process-payment.dto';
import { OrderModel } from '@/presentation/dtos/order/order-model.dto';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';

export abstract class IPaymentProcess {
  abstract process(
    cart: any,
    user: UserModelDto,
    payment: PaymentDataDto,
  ): Promise<{ transaction_id: string; status: string; transaction: any }>;
}
