import { Order } from '@/core/domain/models/order.entity';
export abstract class IDbListOrderRepository {
  abstract getAll(): Promise<Order[]>;
}
