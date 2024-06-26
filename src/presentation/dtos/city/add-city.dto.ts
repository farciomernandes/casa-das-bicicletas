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

  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: true,
  })
  @Expose()
  state_id: string;

  static toDto(payload: AddCityDto): AddCityDto {
    return plainToInstance(AddCityDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
