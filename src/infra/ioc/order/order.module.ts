import { Module } from '@nestjs/common';
import { orderProvider } from './order.provider';
import { IDbAddOrderRepository } from '@/core/domain/protocols/db/order/add-order-repository';
import { IDbListOrderRepository } from '@/core/domain/protocols/db/order/list-order-respository';
import { IDbDeleteOrderRepository } from '@/core/domain/protocols/db/order/delete-order-repository';
import { IDbUpdateOrderRepository } from '@/core/domain/protocols/db/order/update-order-repository';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { OrderController } from '@/presentation/controllers/order/order-controller';

@Module({
  imports: [],
  providers: [...orderProvider],
  controllers: [OrderController],
  exports: [
    IDbAddOrderRepository,
    IDbListOrderRepository,
    IDbDeleteOrderRepository,
    IDbUpdateOrderRepository,
    OrderRepository,
  ],
})
export class OrderModule {}
