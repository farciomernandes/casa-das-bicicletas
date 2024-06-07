import { OrderModelDto } from '@/presentation/dtos/order/order-model.dto';

export abstract class IDbFindTrashOrderRepository {
  abstract findOrdersWithNullStatusAndCreatedBefore(
    date: Date,
  ): Promise<OrderModelDto[]>;
}
