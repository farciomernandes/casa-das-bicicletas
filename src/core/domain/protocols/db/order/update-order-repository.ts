import { Order } from '@/core/domain/models/order.entity';
import { UpdateOrderDto } from '@/presentation/dtos/order/update-order.dto';

export abstract class IDbUpdateOrderRepository {
  abstract update(payload: UpdateOrderDto, id: string): Promise<Order>;
}
