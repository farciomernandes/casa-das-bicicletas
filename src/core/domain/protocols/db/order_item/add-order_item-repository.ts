import { OrderItem } from '@/core/domain/models/order_item.entity';
import { AddOrderItemDto } from '@/presentation/dtos/order_item/add-order_item.dto';

export abstract class IDbAddOrderItemRepository {
  abstract create(payload: AddOrderItemDto): Promise<OrderItem>;
}
