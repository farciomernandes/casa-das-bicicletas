import { Injectable } from '@nestjs/common';
import { IDbListOrderRepository } from '../db/order/list-order-respository';
import { IDbUpdateOrderRepository } from '../db/order/update-order-repository';
import { IDbAddOrderRepository } from '../db/order/add-order-repository';
import { IDbFindOrderByIdRepository } from '../db/order/find-order-by-id-repository';
import { IDbDeleteOrderRepository } from '../db/order/delete-order-repository';
import { UpdateOrderDto } from '@/presentation/dtos/order/update-order.dto';
import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';
import {
  GetAllOrdersDto,
  OrderModelDto,
  OrderParamsDto,
} from '@/presentation/dtos/order/order-model.dto';
import { Authenticated } from '@/presentation/dtos/auth/authenticated.dto';
import { EntityManager } from 'typeorm';
import { IDbFindTrashOrderRepository } from '../db/order/find-trash-orders';

@Injectable()
export abstract class OrderRepository
  implements
    IDbAddOrderRepository,
    IDbListOrderRepository,
    IDbUpdateOrderRepository,
    IDbFindOrderByIdRepository,
    IDbDeleteOrderRepository,
    IDbFindTrashOrderRepository
{
  abstract findOrdersWithNullStatusAndCreatedBefore(
    date: Date,
  ): Promise<OrderModelDto[]>;

  abstract getAll(
    params: OrderParamsDto,
    user?: Authenticated,
  ): Promise<GetAllOrdersDto>;

  abstract findById(id: string): Promise<OrderModelDto>;

  abstract create(
    payload: AddOrderDto,
    user_id: string,
  ): Promise<OrderModelDto>;

  abstract createTransactionMode(
    payload: AddOrderDto,
    user_id: string,
    entityManager: EntityManager,
  );

  abstract delete(id: string): Promise<void>;

  abstract update(payload: UpdateOrderDto, id: string): Promise<OrderModelDto>;

  abstract updateTransactionMode(
    payload: UpdateOrderDto,
    id: string,
    entityManager: EntityManager,
  ): Promise<OrderModelDto>;
}
