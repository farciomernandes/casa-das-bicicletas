import { Injectable } from '@nestjs/common';
import { IDbListOrderRepository } from '../db/order/list-order-respository';
import { IDbUpdateOrderRepository } from '../db/order/update-order-repository';
import { IDbAddOrderRepository } from '../db/order/add-order-repository';
import { IDbFindOrderByIdRepository } from '../db/order/find-order-by-id-repository';
import { IDbDeleteOrderRepository } from '../db/order/delete-order-repository';
import { UpdateOrderDto } from '@/presentation/dtos/order/update-order.dto';
import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';
import { OrderModelDto } from '@/presentation/dtos/order/order-model.dto';
import { Authenticated } from '@/presentation/dtos/auth/authenticated.dto';

@Injectable()
export abstract class OrderRepository
  implements
    IDbAddOrderRepository,
    IDbListOrderRepository,
    IDbUpdateOrderRepository,
    IDbFindOrderByIdRepository,
    IDbDeleteOrderRepository
{
  abstract findById(id: string): Promise<any>;
  abstract getAll(user?: Authenticated): Promise<OrderModelDto[]>;
  abstract create(payload: AddOrderDto, user_id: string): Promise<any>;
  abstract delete(id: string): Promise<void>;
  abstract update(payload: UpdateOrderDto, id: string): Promise<OrderModelDto>;
}
