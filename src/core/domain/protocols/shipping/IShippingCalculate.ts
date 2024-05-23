import { ShippingOptionDto } from '@/presentation/dtos/shipping/shipping-calculate.dto';

export abstract class IShippingCalculate {
  abstract calculateShipping(
    order_id: string,
    to_postal_code: string,
  ): Promise<ShippingOptionDto[]>;
}
