import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';

export class ProductModelDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  large_description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  discount_price: number;

  @ApiProperty()
  discount_percent: number;

  @ApiProperty()
  sku: string;
}

export class CheckoutOrderItemDto {
  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
  })
  @Expose()
  quantity: number;

  @ApiProperty({
    type: Number,
    example: 20,
    required: true,
  })
  @Expose()
  sub_total: number;

  @ApiProperty({
    type: ProductModelDto,
    required: true,
  })
  @Expose()
  product: ProductModelDto;
}

export class AddOrderDto {
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
    example: 100.5,
    required: true,
  })
  @Expose()
  total: number;

  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  transaction_id?: string;

  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: true,
  })
  @Expose()
  user_id: string;

  @ApiProperty({
    type: CheckoutOrderItemDto,
    example: [
      {
        quantity: 1,
        sub_total: 20,
        product: {
          id: 'fb08fe94-f467-4a71-9a66-e4c8f9506cdb',
          name: 'Product Name',
          description: 'Product Description',
          large_description: 'Large Product Description',
          price: 100,
          discount_price: 90,
          discount_percent: 10,
          sku: 'SKU123',
        },
      },
    ],
    required: true,
    isArray: true,
  })
  @Expose()
  order_items: CheckoutOrderItemDto[];

  static toDto(payload: AddOrderDto): AddOrderDto {
    return plainToClass(AddOrderDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
