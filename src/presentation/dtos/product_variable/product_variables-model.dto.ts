import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ProductVariablesModel {
  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'blue',
    required: true,
  })
  @Expose()
  color: string;

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
    required: true,
  })
  @Expose()
  price: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @Expose()
  installment_count: number;

  @ApiProperty({
    type: Number,
    example: 100,
  })
  @Expose()
  installment_value: number;

  @ApiProperty({
    type: Number,
    example: 90,
  })
  @Expose()
  discount_price: number;

  @ApiProperty({
    type: Number,
    example: 10,
    required: true,
  })
  @Expose()
  discount_percent: number;

  @ApiProperty({
    type: String,
    example: 'SKU123',
  })
  @Expose()
  sku: string;

  @ApiProperty({
    type: Number,
    example: 10,
    required: true,
  })
  @Expose()
  quantity: number;

  @ApiProperty({
    type: String,
    example: 'large',
    required: true,
  })
  @Expose()
  size: string;

  @ApiProperty({
    type: String,
    example: 'Ferro nobre',
    required: true,
  })
  @Expose()
  type: string;

  @ApiProperty({
    type: String,
    example: '1.4',
    required: true,
  })
  @Expose()
  weight: string;

  @ApiProperty({
    type: String,
    example: 'Circular',
    required: true,
  })
  @Expose()
  format: string;

  @ApiProperty({
    type: String,
    example: '30',
    required: true,
  })
  @Expose()
  length: string;

  @ApiProperty({
    type: String,
    example: '40',
    required: true,
  })
  @Expose()
  height: string;

  @ApiProperty({
    type: String,
    example: '10',
    required: true,
  })
  @Expose()
  width: string;

  @ApiProperty({
    type: String,
    example: '46',
    required: true,
  })
  @Expose()
  diameter: string;

  @ApiProperty({
    example: 'link1',
    required: true,
  })
  @IsNotEmpty()
  @IsString({ each: true })
  @Expose()
  image_link: string;

  @ApiProperty({
    type: String,
    example: '994fb2cd-0f39-4a71-b15c-333b7e2ff793',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  product_id: string;

  static toDto(payload: ProductVariablesModel): ProductVariablesModel {
    return plainToInstance(ProductVariablesModel, payload, {
      excludeExtraneousValues: true,
    });
  }
}