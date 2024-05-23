import { Shipping } from '@/core/domain/models/shipping.entity';

export abstract class IDbListShippingRepository {
  abstract getAll(): Promise<Shipping[]>;
}
