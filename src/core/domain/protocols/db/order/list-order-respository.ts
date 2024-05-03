import { Authenticated } from '@/presentation/dtos/auth/authenticated.dto';
import { OrderModel } from '@/presentation/dtos/order/order-model.dto';
export abstract class IDbListOrderRepository {
  abstract getAll(user?: Authenticated): Promise<OrderModel[]>;
}
