import { Injectable } from '@nestjs/common';
import { Order } from '@/core/domain/models/order.entity';
import { IDbListOrderRepository } from '../db/order/list-order-respository';
import { IDbUpdateOrderRepository } from '../db/order/update-order-repository';
import { IDbAddOrderRepository } from '../db/order/add-order-repository';
import { IDbFindOrderByIdRepository } from '../db/order/find-order-by-id-repository';
import { IDbDeleteOrderRepository } from '../db/order/delete-order-repository';
import { UpdateOrderDto } from '@/presentation/dtos/order/update-order.dto';
import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';

@Injectable()
export abstract class OrderRepository
  implements
    IDbAddOrderRepository,
    IDbListOrderRepository,
    IDbUpdateOrderRepository,
    IDbFindOrderByIdRepository,
    IDbDeleteOrderRepository
{
  abstract findById(id: string): Promise<Order>;
  abstract getAll(): Promise<Order[]>;
  abstract create(payload: AddOrderDto): Promise<Order>;
  abstract delete(id: string): Promise<void>;
  abstract update(payload: UpdateOrderDto, id: string): Promise<Order>;
}
