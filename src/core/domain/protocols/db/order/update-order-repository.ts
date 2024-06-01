import { OrderModelDto } from '@/presentation/dtos/order/order-model.dto';
import { UpdateOrderDto } from '@/presentation/dtos/order/update-order.dto';
import { EntityManager } from 'typeorm';

export abstract class IDbUpdateOrderRepository {
  abstract update(
    payload: UpdateOrderDto,
    id: string,
    entityManager?: EntityManager,
  ): Promise<OrderModelDto>;
}
