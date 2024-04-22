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

  static toDto(payload: UpdateOrderDto): UpdateOrderDto {
    return plainToClass(UpdateOrderDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
