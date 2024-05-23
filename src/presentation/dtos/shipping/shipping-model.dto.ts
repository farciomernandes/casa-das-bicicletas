import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

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
    type: Date,
    example: '2024-05-25T10:30:00Z',
    required: true,
  })
  @Expose()
  @IsDate()
  @IsNotEmpty()
  created_at: Date;

  static toDto(payload: any): ShippingModelDto {
    return plainToInstance(ShippingModelDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
