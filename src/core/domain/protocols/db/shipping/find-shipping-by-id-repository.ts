import { ShippingModelDto } from '@/presentation/dtos/shipping/shipping-model.dto';

export abstract class IDbFindShippingByIdRepository {
  abstract findById(id: string): Promise<ShippingModelDto>;
}
