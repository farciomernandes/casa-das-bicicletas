import { Shipping } from '@/core/domain/models/shipping.entity';
import { UpdateShippingDto } from '@/presentation/dtos/shipping/update-shipping.dto';

export abstract class IDbUpdateShippingRepository {
  abstract update(payload: UpdateShippingDto, id: string): Promise<Shipping>;
}
