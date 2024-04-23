import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { ProductModelDto } from '../product/product-model.dto';

export class CheckoutOrderItemDto {
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
    type: ProductModelDto,
    required: true,
  })
  @Expose()
  product: ProductModelDto;

  static toDto(payload: CheckoutOrderItemDto): CheckoutOrderItemDto {
    return plainToClass(CheckoutOrderItemDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
