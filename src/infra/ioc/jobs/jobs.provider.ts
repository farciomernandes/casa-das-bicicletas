import { Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { OrderTypeOrmRepository } from '@/infra/db/typeorm/repositories/order-typeorm.repository';
import { Order } from '@/core/domain/models/order.entity';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { IProcessPendingOrders } from '@/core/domain/protocols/db/order/process-pending-orders';
import { ProcessPendingOrders } from '@/core/application/order/process-pending-orders';
import { ProcessPendingOrdersJob } from '@/infra/jobs/process-pending-orders.job';

export const jobProvider: Provider[] = [
  {
    provide: OrderTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new OrderTypeOrmRepository(dataSource.getRepository(Order));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: OrderRepository,
    useExisting: OrderTypeOrmRepository,
  },
  {
    provide: IProcessPendingOrders,
    useFactory: (orderRepository: OrderRepository): IProcessPendingOrders => {
      return new ProcessPendingOrders(orderRepository);
    },
    inject: [OrderRepository],
  },
  {
    provide: ProcessPendingOrdersJob,
    useFactory: (
      processPendingOrders: IProcessPendingOrders,
    ): ProcessPendingOrdersJob => {
      return new ProcessPendingOrdersJob(processPendingOrders);
    },
    inject: [IProcessPendingOrders],
  },
];
