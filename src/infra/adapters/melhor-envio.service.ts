import { IShippingCalculateSent } from '@/core/domain/protocols/shipping/shipping-calculate-sent';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ShippingOption } from 'aws-sdk/clients/snowball';
import axios from 'axios';

@Injectable()
export class MelhorEnvioAdapter implements IShippingCalculateSent {
  private url: string;

  constructor(private readonly configService: ConfigService) {
    this.url = configService.get<string>('MELHOR_ENVIO_URL');
  }

  async calculateShipping(
    originZipCode: string,
    destinationZipCode: string,
    weight: number,
    length: number,
    height: number,
    width: number,
  ): Promise<ShippingOption[]> {
    const payload = {
      from: {
        postal_code: originZipCode,
      },
      to: {
        postal_code: destinationZipCode,
      },
      products: [
        {
          weight,
          width,
          height,
          length,
          insurance_value: 0, // Valor declarado para seguro, opcional
        },
      ],
    };

    try {
      const response = await axios.post(
        `${this.url}/me/shipment/calculate`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.configService.get<string>(
              'MELHOR_ENVIO_TOKEN_TOKEN',
            )}`,
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, compress, deflate, br',
            'User-Agent': this.configService.get<string>(
              'EMAIL_CASA_DAS_BICICLETAS',
            ),
          },
        },
      );
      return response.data as ShippingOption[];
    } catch (error) {
      throw new BadRequestException(
        'Error calculating shipping: ' + error.message,
      );
    }
  }
}
