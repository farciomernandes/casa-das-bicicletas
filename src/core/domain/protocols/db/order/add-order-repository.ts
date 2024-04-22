import { Order } from '@/core/domain/models/order.entity';
import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';

export abstract class IDbAddOrderRepository {
  abstract create(payload: AddOrderDto): Promise<Order>;
}
