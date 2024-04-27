import { PaymentDataDto } from '@/presentation/dtos/checkout/process-payment.dto';
export abstract class ICheckoutOrder {
  abstract process(
    order_id: string,
    user_id: string,
    payment: PaymentDataDto,
  ): Promise<any>;
}
