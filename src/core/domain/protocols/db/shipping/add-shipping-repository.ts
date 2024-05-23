import { Shipping } from '@/core/domain/models/shipping.entity';
import { AddShippingDto } from '@/presentation/dtos/shipping/add-shipping.dto';

export abstract class IDbAddShippingRepository {
  abstract create(payload: AddShippingDto): Promise<Shipping>;
}
