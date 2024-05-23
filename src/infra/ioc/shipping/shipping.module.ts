import { Module } from '@nestjs/common';
import { shippingProvider } from './shipping.provider';
import { ShippingController } from '@/presentation/controllers/shipping/shipping-controller';
import { IShippingCalculate } from '@/core/domain/protocols/shipping/IShippingCalculate';

@Module({
  imports: [],
  providers: [...shippingProvider],
  controllers: [ShippingController],
  exports: [IShippingCalculate],
})
export class ShippingModule {}
