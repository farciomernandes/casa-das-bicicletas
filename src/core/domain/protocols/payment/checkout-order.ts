import { PaymentDataDto } from '@/presentation/dtos/checkout/process-payment.dto';
import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';

export abstract class ICheckoutOrder {
  abstract process(
    order: AddOrderDto,
    user_id: string,
    payment: PaymentDataDto,
  ): Promise<{ id: string; transaction_id: string; status: string }>;
}
