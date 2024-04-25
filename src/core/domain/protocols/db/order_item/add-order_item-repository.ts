import { AddOrderItemDto } from '@/presentation/dtos/order_item/add-order_item.dto';
import { OrderItemDto } from '@/presentation/dtos/order_item/order_item-model.dto';

export abstract class IDbAddOrderItemRepository {
  abstract create(payload: AddOrderItemDto): Promise<OrderItemDto>;
}
