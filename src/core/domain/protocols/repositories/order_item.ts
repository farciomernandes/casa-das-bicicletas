import { Injectable } from '@nestjs/common';
import { OrderItem } from '@/core/domain/models/order_item.entity';
import { IDbListOrderItemRepository } from '../db/order_item/list-order_item-respository';
import { IDbUpdateOrderItemRepository } from '../db/order_item/update-order_item-repository';
import { IDbAddOrderItemRepository } from '../db/order_item/add-order_item-repository';
import { IDbFindOrderItemByIdRepository } from '../db/order_item/find-order_item-by-id-repository';
import { IDbDeleteOrderItemRepository } from '../db/order_item/delete-order_item-repository';
import { AddOrderItemDto } from '@/presentation/dtos/order_item/add-order_item.dto';
import { UpdateOrderItemDto } from '@/presentation/dtos/order_item/update-order_item.dto';
import { OrderItemDto } from '@/presentation/dtos/order_item/order_item-model.dto';

@Injectable()
export abstract class OrderItemRepository
  implements
    IDbAddOrderItemRepository,
    IDbListOrderItemRepository,
    IDbUpdateOrderItemRepository,
    IDbFindOrderItemByIdRepository,
    IDbDeleteOrderItemRepository
{
  abstract findById(id: string): Promise<OrderItem>;
  abstract getAll(): Promise<OrderItemDto[]>;
  abstract create(payload: AddOrderItemDto): Promise<OrderItem>;
  abstract delete(id: string): Promise<void>;
  abstract update(payload: UpdateOrderItemDto, id: string): Promise<OrderItem>;
}
