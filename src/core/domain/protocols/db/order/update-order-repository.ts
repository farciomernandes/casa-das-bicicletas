import { OrderModel } from '@/presentation/dtos/order/order-model.dto';
import { UpdateOrderDto } from '@/presentation/dtos/order/update-order.dto';

export abstract class IDbUpdateOrderRepository {
  abstract update(payload: UpdateOrderDto, id: string): Promise<OrderModel>;
}
