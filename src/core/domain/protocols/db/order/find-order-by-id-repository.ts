import { OrderModelDto } from '@/presentation/dtos/order/order-model.dto';

export abstract class IDbFindOrderByIdRepository {
  abstract findById(id: string): Promise<OrderModelDto>;
}
