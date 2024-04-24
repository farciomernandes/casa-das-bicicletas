import { OrderModel } from '@/presentation/dtos/order/order-model.dto';
export abstract class IDbListOrderRepository {
  abstract getAll(): Promise<OrderModel[]>;
}
