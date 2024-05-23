import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateShippingDto {
  @ApiProperty({
    type: String,
    example: 'Shipping Name',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

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
    example: 'Shipping Price',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    type: Number,
    example: 10,
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  max_delivery_time: number;

  @ApiProperty({
    type: Number,
    example: 5,
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  min_delivery_time: number;

  @ApiProperty({
    type: String,
    example: 'Company Name',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @ApiProperty({
    type: String,
    example: 'Company Picture Link',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  company_picture: string;

  static toDto(payload: UpdateShippingDto): UpdateShippingDto {
    return plainToClass(UpdateShippingDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
