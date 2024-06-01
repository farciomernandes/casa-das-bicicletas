import { OrderModelDto } from '@/presentation/dtos/order/order-model.dto';
import { ShippingOptionDto } from '@/presentation/dtos/shipping/shipping-calculate.dto';

export abstract class IShippingService {
  abstract calculateShipping(
    order: OrderModelDto,
    to_postal_code: string,
  ): Promise<ShippingOptionDto[]>;
}
