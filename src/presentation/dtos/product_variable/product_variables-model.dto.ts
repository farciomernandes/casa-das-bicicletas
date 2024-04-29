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
    example: 'link1',
    required: true,
  })
  @IsNotEmpty()
  @IsString({ each: true })
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

  @ApiProperty({
    type: String,
    example: '2024-04-20T10:00:00.000Z',
    required: false,
  })
  @Expose()
  created_at?: Date;

  @ApiProperty({
    type: String,
    example: '2024-04-20T12:00:00.000Z',
    required: false,
  })
  @Expose()
  updated_at?: Date;

  static toDto(payload: ProductVariablesModel): ProductVariablesModel {
    return plainToInstance(ProductVariablesModel, payload, {
      excludeExtraneousValues: true,
    });
  }
}
