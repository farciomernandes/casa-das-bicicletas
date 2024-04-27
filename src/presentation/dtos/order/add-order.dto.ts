import { OrderStatusEnum } from '@/shared/enums/order_status.enum';
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
  installment_count: number;

  @ApiProperty()
  installment_value: number;

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
    type: String,
    required: true,
  })
  @Expose()
  attribute_id: string;
}

export class AddOrderDto {
  @ApiProperty({
    type: String,
    example: OrderStatusEnum.PAID,
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
        attribute_id: 'fb08fe94-f467-4a71-9a66-e4c8f9506cdb',
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
