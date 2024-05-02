import { Expose, plainToInstance } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductModelDto {
  @ApiProperty({
    type: String,
    example: 'Product Name',
  })
  @Expose()
  name: string;

  static toDto(payload: UpdateProductModelDto): UpdateProductModelDto {
    return plainToInstance(UpdateProductModelDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
