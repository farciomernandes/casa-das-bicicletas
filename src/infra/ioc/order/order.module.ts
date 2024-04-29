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
import { ICheckoutOrder } from '@/core/domain/protocols/payment/checkout-order';
import { IPaymentProcess } from '@/core/domain/protocols/asaas/payment-process';
import { ProductVariablesRepository } from '@/core/domain/protocols/repositories/product_variable';

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
    ProductVariablesRepository,
    OrderItemRepository,
    ICheckoutOrder,
    IPaymentProcess,
  ],
})
export class OrderModule {}
