import { CheckoutOrderDto } from '@/presentation/dtos/checkout/process-payment.dto';
import { CheckoutOrderModelDto } from '@/presentation/dtos/order/checkout-order.dto';
export abstract class ICheckoutOrder {
  abstract process(
    order_id: string,
    user_id: string,
    payment: CheckoutOrderDto,
  ): Promise<CheckoutOrderModelDto>;
}
