import { IShippingCalculateSent } from '@/core/domain/protocols/shipping/shipping-calculate-sent';
import { MelhorEnvioAdapter } from '@/infra/adapters/melhor-envio.service';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const shippingProvider: Provider[] = [
  MelhorEnvioAdapter,
  {
    provide: MelhorEnvioAdapter,
    useFactory: (configService: ConfigService): MelhorEnvioAdapter => {
      return new MelhorEnvioAdapter(configService);
    },
    inject: [ConfigService],
  },
  {
    provide: IShippingCalculateSent,
    useClass: MelhorEnvioAdapter,
  },
];
