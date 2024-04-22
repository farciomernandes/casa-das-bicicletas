import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class UpdateCityDto {
  @ApiProperty({
    type: String,
    example: 'Juazeiro do Norte',
    required: true,
  })
  @Expose()
  name: string;

  static toDto(payload: UpdateCityDto): UpdateCityDto {
    return plainToInstance(UpdateCityDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
