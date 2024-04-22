import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';

export class UpdateOrderItemDto {
  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
  })
  @Expose()
  quantity: number;

  static toDto(payload: UpdateOrderItemDto): UpdateOrderItemDto {
    return plainToClass(UpdateOrderItemDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
