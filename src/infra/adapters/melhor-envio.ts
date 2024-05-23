import { IShippingService } from '@/core/domain/protocols/melhor-envio/melhor-envio-service';
import { OrderModelDto } from '@/presentation/dtos/order/order-model.dto';
import { ShippingOptionDto } from '@/presentation/dtos/shipping/shipping-calculate.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MelhorEnvioAdapter implements IShippingService {
  private url: string;

  constructor(private readonly configService: ConfigService) {
    this.url = configService.get<string>('MELHOR_ENVIO_URL');
  }

  async calculateShipping(
    order: OrderModelDto,
    to_postal_code: string,
    from_postal_code: string,
  ): Promise<ShippingOptionDto[]> {
    const payload = {
      from: {
        postal_code: from_postal_code,
      },
      to: {
        postal_code: to_postal_code,
      },
      package: order.order_items.map((product) => {
        return {
          weight: product.product_variables.weight,
          width: product.product_variables.width,
          height: product.product_variables.height,
          length: product.product_variables.length,
          insurance_value: 0, // Valor declarado para seguro, opcional
        };
      }),
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
      return response.data.map((item) => ShippingOptionDto.toDto(item));
    } catch (error) {
      throw new BadRequestException(
        'Error calculating shipping: ' + error.message,
      );
    }
  }
}
