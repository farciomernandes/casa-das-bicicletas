import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';

export class UpdateOrderDto {
  @ApiProperty({
    type: String,
    example: 'PENDING',
    enum: ['PENDING', 'PAID', 'CANCELED'],
  })
  @Expose()
  status: string;

  @ApiProperty({
    type: Number,
    example: 100.5,
  })
  @Expose()
  total: number;

  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  transaction_id?: string;

  static toDto(payload: UpdateOrderDto): UpdateOrderDto {
    return plainToClass(UpdateOrderDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
