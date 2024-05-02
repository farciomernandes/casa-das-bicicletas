import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsString, IsNumber, IsUUID } from 'class-validator';

export class ProductParamsDTO {
  @ApiProperty({
    type: String,
    example: 'Product ID',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'd2f6d8f8-8d0d-4110-bf63-af23fd441138',
    required: false,
  })
  @Expose()
  category_id: string;

  @ApiProperty({
    type: String,
    example: 'Product Name',
    required: false,
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: Number,
    example: 100,
    required: false,
  })
  @Expose()
  price: number;

  @ApiProperty({
    type: Number,
    example: 1,
    required: false,
  })
  @Expose()
  page: number;

  @ApiProperty({
    type: Number,
    example: 8,
    required: false,
  })
  @Expose()
  limit: number;

  @ApiProperty({
    type: String,
    example: '00001',
    required: false,
  })
  @Expose()
  sku: string;

  static toDTO(payload: any): ProductParamsDTO {
    return plainToClass(ProductParamsDTO, payload, {
      excludeExtraneousValues: true,
    });
  }
}