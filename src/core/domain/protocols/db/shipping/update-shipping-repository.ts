import { ShippingModelDto } from '@/presentation/dtos/shipping/shipping-model.dto';
import { UpdateShippingDto } from '@/presentation/dtos/shipping/update-shipping.dto';

export abstract class IDbUpdateShippingRepository {
  abstract update(
    payload: UpdateShippingDto,
    id: string,
  ): Promise<ShippingModelDto>;
}
