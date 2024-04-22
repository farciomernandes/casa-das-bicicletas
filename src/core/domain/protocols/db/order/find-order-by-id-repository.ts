import { Order } from '@/core/domain/models/order.entity';

export abstract class IDbFindOrderByIdRepository {
  abstract findById(id: string): Promise<Order>;
}
