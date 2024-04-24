import { PaymentDataDto } from '@/presentation/dtos/checkout/process-payment.dto';
import { OrderModel } from '@/presentation/dtos/order/order-model.dto';
export abstract class ICheckoutOrder {
  abstract process(
    order_id: string,
    user_id: string,
    payment: PaymentDataDto,
  ): Promise<OrderModel>;
}
