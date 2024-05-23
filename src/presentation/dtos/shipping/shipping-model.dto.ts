import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ShippingModelDto {
  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'Shipping Name',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    example: 10.5,
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: Number,
    example: 5,
    required: true,
    description: 'Maximum time to deliver the product',
  })
  @Expose()
  @IsNotEmpty()
  max_delivery_time: number;

  @ApiProperty({
    type: Number,
    example: 2,
    required: true,
    description: 'Minimum time to deliver the product',
  })
  @Expose()
  @IsNotEmpty()
  min_delivery_time: number;

  @ApiProperty({
    type: String,
    example: 'Company Name',
    required: true,
    description: 'Company name that shipping product',
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  company_name: string;

  @ApiProperty({
    type: String,
    example: 'https://example.com/company_logo.png',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  company_picture: string;

  @ApiProperty({
    type: String,
    example: 'PROCESSING',
    enum: ['PROCESSING', 'SENT', null],
    required: false,
  })
  @Expose()
  status?: string;

  @ApiProperty({
    type: String,
    example: '994fb2cd-0f39-4a71-b15c-333b7e2ff793',
    required: true,
  })
  @Expose()
  order_id: string;

  static toDto(payload: any): ShippingModelDto {
    const saved = plainToInstance(ShippingModelDto, payload, {
      excludeExtraneousValues: true,
    });

    return saved;
  }
}
