import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({
    type: String,
    example: 'PENDING',
    enum: ['PENDING', 'PAID', 'CANCELED'],
    required: false,
  })
  @Expose()
  @IsOptional()
  status: string;

  @ApiProperty({
    type: Number,
    example: 100.5,
    required: false,
  })
  @Expose()
  @IsOptional()
  total: number;

  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  @IsOptional()
  transaction_id?: string;

  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  @IsOptional()
  address_id?: string;

  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  @IsOptional()
  shippings_id?: string;

  static toDto(payload: UpdateOrderDto): UpdateOrderDto {
    return plainToClass(UpdateOrderDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
