import { HealthController } from '@/presentation/controllers/health-controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [],
  exports: [HealthController],
})
export class HealthModule {}
