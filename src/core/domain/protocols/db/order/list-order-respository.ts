import { Authenticated } from '@/presentation/dtos/auth/authenticated.dto';
import {
  GetAllOrdersDto,
  OrderParamsDto,
} from '@/presentation/dtos/order/order-model.dto';
export abstract class IDbListOrderRepository {
  abstract getAll(
    params: OrderParamsDto,
    user?: Authenticated,
  ): Promise<GetAllOrdersDto>;
}
