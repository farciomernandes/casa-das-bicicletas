import { OrderItem } from '@/core/domain/models/order_item.entity';

export abstract class IDbFindOrderItemByIdRepository {
  abstract findById(id: string): Promise<OrderItem>;
}
