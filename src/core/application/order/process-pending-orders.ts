import { IProcessPendingOrders } from '@/core/domain/protocols/db/order/process-pending-orders';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProcessPendingOrders implements IProcessPendingOrders {
  private static readonly TRASH_ORDER_DAYS = 14;

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute() {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(
      twoWeeksAgo.getDate() - ProcessPendingOrders.TRASH_ORDER_DAYS,
    );

    const pendingOrders =
      await this.orderRepository.findOrdersWithNullStatusAndCreatedBefore(
        twoWeeksAgo,
      );

    for (const order of pendingOrders) {
      console.log(`Deleting order ID: ${order.id}`);
      await this.orderRepository.delete(order.id);
    }
  }
}
