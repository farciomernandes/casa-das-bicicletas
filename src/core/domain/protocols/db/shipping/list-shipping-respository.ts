import { ShippingModelDto } from '@/presentation/dtos/shipping/shipping-model.dto';

export abstract class IDbListShippingRepository {
  abstract getAll(): Promise<ShippingModelDto[]>;
}
