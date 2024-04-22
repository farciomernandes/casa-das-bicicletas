import { Module } from '@nestjs/common';
import { orderItemProvider } from './order_item.provider';
import { IDbAddOrderItemRepository } from '@/core/domain/protocols/db/order_item/add-order_item-repository';
import { IDbListOrderItemRepository } from '@/core/domain/protocols/db/order_item/list-order_item-respository';
import { IDbDeleteOrderItemRepository } from '@/core/domain/protocols/db/order_item/delete-order_item-repository';
import { IDbUpdateOrderItemRepository } from '@/core/domain/protocols/db/order_item/update-order_item-repository';
import { OrderItemRepository } from '@/core/domain/protocols/repositories/order_item';
import { OrderItemController } from '@/presentation/controllers/order_item/order_item-controller';

@Module({
  imports: [],
  providers: [...orderItemProvider],
  controllers: [OrderItemController],
  exports: [
    IDbAddOrderItemRepository,
    IDbListOrderItemRepository,
    IDbDeleteOrderItemRepository,
    IDbUpdateOrderItemRepository,
    OrderItemRepository,
  ],
})
export class OrderItemModule {}
