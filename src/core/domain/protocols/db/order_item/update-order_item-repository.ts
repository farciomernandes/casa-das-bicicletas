import { OrderItem } from '@/core/domain/models/order_item.entity';
import { UpdateOrderItemDto } from '@/presentation/dtos/order_item/update-order_item.dto';

export abstract class IDbUpdateOrderItemRepository {
  abstract update(payload: UpdateOrderItemDto, id: string): Promise<OrderItem>;
}
