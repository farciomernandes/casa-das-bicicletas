import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';
import { OrderModel } from '@/presentation/dtos/order/order-model.dto';

export abstract class IDbAddOrderRepository {
  abstract create(payload: AddOrderDto, user_id: string): Promise<OrderModel>;
}
