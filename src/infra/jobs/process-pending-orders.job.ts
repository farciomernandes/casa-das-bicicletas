import { IProcessPendingOrders } from '@/core/domain/protocols/db/order/process-pending-orders';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ProcessPendingOrdersJob {
  private static readonly CRON_MINUTE = '13'; // 54 minutos
  private static readonly CRON_HOUR = '14'; // 13:00 (1 PM)
  private static readonly CRON_DAY_OF_WEEK = '*'; // Todos os dias ( 0 DOMINGO )

  private static readonly CRON_SCHEDULE = `${ProcessPendingOrdersJob.CRON_MINUTE} ${ProcessPendingOrdersJob.CRON_HOUR} * * ${ProcessPendingOrdersJob.CRON_DAY_OF_WEEK}`;

  constructor(private readonly processPendingOrders: IProcessPendingOrders) {}

  @Cron(ProcessPendingOrdersJob.CRON_SCHEDULE)
  async handleCron() {
    console.log('Running process pending orders job');
    await this.processPendingOrders.execute();
  }
}
