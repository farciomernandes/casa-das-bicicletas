import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { AddProductModelDto } from '../product/add-product.dto';
import { AddOrderDto } from '../order/add-order.dto';

export class OrderItemDto {
  @ApiProperty({
    type: String,
    example: 'OrderItem ID',
    required: false,
  })
  @Expose()
  id: string;

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
    type: AddOrderDto,
    required: true,
  })
  @Expose()
  order: AddOrderDto;

  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: true,
  })
  @Expose()
  order_id: string;

  @ApiProperty({
    type: AddProductModelDto,
    required: true,
  })
  @Expose()
  product: AddProductModelDto;

  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: true,
  })
  @Expose()
  product_id: string;

  static toDto(payload: OrderItemDto): OrderItemDto {
    return plainToClass(OrderItemDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
