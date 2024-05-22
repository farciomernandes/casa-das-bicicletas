import { IShippingCalculateSent } from '@/core/domain/protocols/shipping/shipping-calculate-sent';
import { Module } from '@nestjs/common';
import { shippingProvider } from './shipping.provider';
import { ShippingController } from '@/presentation/controllers/shipping/shipping-controller';

@Module({
  imports: [],
  providers: [...shippingProvider],
  controllers: [ShippingController],
  exports: [IShippingCalculateSent],
})
export class ShippingModule {}
