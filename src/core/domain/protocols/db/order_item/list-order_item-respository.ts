import { OrderItemDto } from '@/presentation/dtos/order_item/order_item-model.dto';

export abstract class IDbListOrderItemRepository {
  abstract getAll(): Promise<OrderItemDto[]>;
}
