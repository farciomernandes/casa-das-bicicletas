import { Shipping } from '@/core/domain/models/shipping.entity';

export abstract class IDbFindShippingByIdRepository {
  abstract findById(id: string): Promise<Shipping>;
}
