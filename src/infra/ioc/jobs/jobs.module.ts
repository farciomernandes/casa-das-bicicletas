import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { jobProvider } from './jobs.provider';
import { ProcessPendingOrdersJob } from '@/infra/jobs/process-pending-orders.job';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [...jobProvider, ProcessPendingOrdersJob],
  exports: [ProcessPendingOrdersJob],
})
export class JobsModule {}
