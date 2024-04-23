import { Module } from '@nestjs/common';
import { orderProvider } from './order.provider';
import { IDbAddOrderRepository } from '@/core/domain/protocols/db/order/add-order-repository';
import { IDbListOrderRepository } from '@/core/domain/protocols/db/order/list-order-respository';
import { IDbDeleteOrderRepository } from '@/core/domain/protocols/db/order/delete-order-repository';
import { IDbUpdateOrderRepository } from '@/core/domain/protocols/db/order/update-order-repository';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { OrderController } from '@/presentation/controllers/order/order-controller';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { OrderItemRepository } from '@/core/domain/protocols/repositories/order_item';

@Module({
  imports: [],
  providers: [...orderProvider],
  controllers: [OrderController],
  exports: [
    IDbAddOrderRepository,
    IDbListOrderRepository,
    IDbDeleteOrderRepository,
    IDbUpdateOrderRepository,
    IDbAddOrderRepository,
    OrderRepository,
    ProductRepository,
    OrderItemRepository,
  ],
})
export class OrderModule {}