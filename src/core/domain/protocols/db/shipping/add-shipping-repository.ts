import { AddShippingDto } from '@/presentation/dtos/shipping/add-shipping.dto';
import { ShippingModelDto } from '@/presentation/dtos/shipping/shipping-model.dto';

export abstract class IDbAddShippingRepository {
  abstract create(payload: AddShippingDto): Promise<ShippingModelDto>;
}
