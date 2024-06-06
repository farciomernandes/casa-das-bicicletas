import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { AddressModelDto } from '../address/address-model.dto';
import { UserModelDto } from '../user/user-model.dto';
import { OrderItemLocally } from './order-item-locally.dto';
import { ShippingModelDto } from '../shipping/shipping-model.dto';

export class OrderModelDto {
  @ApiProperty({
    type: String,
    example: '4801d530-f7c6-4fb7-a04d-480d3a7adf40',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'PENDING',
    enum: ['PENDING', 'PAID', 'CANCELED'],
    required: true,
  })
  @Expose()
  status: string;

  @ApiProperty({
    type: Number,
    example: 100,
    required: true,
  })
  @Expose()
  total: number;

  @ApiProperty({
    type: String,
    example: null,
    required: false,
  })
  @Expose()
  transaction_id?: string | null;

  @ApiProperty({
    type: UserModelDto,
    required: true,
  })
  @Expose()
  user: UserModelDto;

  @ApiProperty({
    type: AddressModelDto,
    required: false,
  })
  @Expose()
  @IsOptional()
  address?: AddressModelDto;

  @ApiProperty({
    type: [OrderItemLocally],
    isArray: true,
    description: 'Array of OrderItemLocally',
    example: [
      {
        id: 'bfd6df5a-53b5-4e6f-af7a-22188425bb2d',
        quantity: 1,
        sub_total: '100',
        order_id: '4801d530-f7c6-4fb7-a04d-480d3a7adf40',
        product_variables_id: 'b9d0c1d6-b48a-4d7c-ab07-c1abe12681c9',
        created_at: '2024-05-08T18:05:26.392Z',
        updated_at: '2024-05-08T18:05:26.392Z',
        deleted_at: null,
        product_variables: {
          id: 'b9d0c1d6-b48a-4d7c-ab07-c1abe12681c9',
          color: 'red',
          description: 'Product Description sadsadas',
          large_description: 'dsadasdasd',
          price: '100',
          installment_value: 100,
          installment_count: 1,
          discount_price: '2',
          discount_percent: '10',
          sku: 'dsadasd',
          quantity: 10,
          size: 'large',
          image_link:
            'https://casa-das-bicicletas.s3.us-east-2.amazonaws.com/Capturadetelade2024-05-0710-47-38-b4b6e607-cc52-4a9d-be2c-3fb582c9326c.png',
          created_at: '2024-05-08T18:05:12.449Z',
          updated_at: '2024-05-08T20:49:34.966Z',
          product_id: '30c50624-fc36-4c51-8d19-e655196dab8d',
          type: 'Madeira Top',
          weight: '1.5',
          format: 'Violão G',
          length: '30',
          height: '20',
          width: '10',
          diameter: '10',
          product: {
            id: '30c50624-fc36-4c51-8d19-e655196dab8d',
            name: 'Product Name',
            category_id: '7b15bace-06c3-4d86-a8dd-30da324f6997',
            created_date: '2024-05-08T18:04:56.166Z',
            updated_date: '2024-05-08T18:04:56.166Z',
          },
        },
      },
    ],
  })
  @Expose()
  @IsOptional()
  order_items: OrderItemLocally[];

  @ApiProperty({
    type: Date,
    example: Date.now(),
    required: true,
  })
  @Expose()
  created_at: Date;

  @ApiProperty({
    type: ShippingModelDto,
    required: false,
  })
  @Expose()
  @IsOptional()
  shipping?: ShippingModelDto;

  static toDto(payload: any): OrderModelDto {
    const order = plainToClass(OrderModelDto, payload, {
      excludeExtraneousValues: true,
    });

    let order_items = [];

    if (payload?.order_items) {
      order_items = payload.order_items.map((item) =>
        OrderItemLocally.toDto(item),
      );
    }

    let address = null;
    if (payload?.address) {
      address = AddressModelDto.toDto(payload.address);
    }

    let shipping = payload.shippings ? payload.shippings : null;
    if (payload.shippings) {
      shipping = ShippingModelDto.toDto(payload.shippings);
    }

    const user = UserModelDto.toDto(payload.user);

    return {
      ...order,
      order_items,
      address,
      shipping,
      user,
    };
  }
}

export class OrderParamsDto {
  @ApiProperty({
    type: String,
    example: '4801d530-f7c6-4fb7-a04d-480d3a7adf40',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 10,
    description: 'Número máximo de resultados por página',
    required: true,
  })
  limit: number;

  @ApiProperty({
    example: 1,
    description: 'Número da página desejada',
    required: true,
  })
  page: number;

  @ApiProperty({
    example: 'pending',
    description: 'Status do pedido a ser filtrado',
    required: false,
  })
  status?: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Nome do usuário associado ao pedido',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: new Date(),
    description: 'Data inicial',
    required: false,
  })
  start_date?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'Data final',
    required: false,
  })
  end_date?: Date;
}

export class GetAllOrdersDto {
  @ApiProperty({
    type: [OrderModelDto],
    description: 'Lista de pedidos retornados',
  })
  orders: OrderModelDto[];

  @ApiProperty({
    example: 3,
    description: 'Número total de páginas',
  })
  pages: number;

  @ApiProperty({
    example: 25,
    description: 'Número total de resultados',
  })
  total: number;
}
