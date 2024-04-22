import { Expose, plainToInstance } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductModelDto {
  @ApiProperty({
    type: String,
    example: 'Product Name',
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Product Description',
  })
  @Expose()
  description: string;

  @ApiProperty({
    type: String,
    example: 'Large Product Description',
  })
  @Expose()
  large_description: string;

  @ApiProperty({
    type: Number,
    example: 100,
  })
  @Expose()
  price: number;

  @ApiProperty({
    type: Number,
  })
  @Expose()
  discount_price: number;

  @ApiProperty({
    type: Number,
    example: 10,
  })
  @Expose()
  discount_percent: number;

  @ApiProperty({
    type: String,
  })
  @Expose()
  sku: string;

  static toDto(payload: UpdateProductModelDto): UpdateProductModelDto {
    return plainToInstance(UpdateProductModelDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
