import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class AddCityDto {
  @ApiProperty({
    type: String,
    example: 'Juazeiro do Norte',
    required: true,
  })
  @Expose()
  name: string;

  static toDto(payload: AddCityDto): AddCityDto {
    return plainToInstance(AddCityDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
