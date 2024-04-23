import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { CheckoutOrderItemDto } from '../order_item/checkout-order_item.dto';

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
  })
  user_id: string;

  @ApiProperty({
    type: CheckoutOrderItemDto,
    example: CheckoutOrderItemDto,
    required: true,
  })
  @Expose()
  order_items: CheckoutOrderItemDto[];

  static toDto(payload: AddOrderDto): AddOrderDto {
    return plainToClass(AddOrderDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
