import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class CityParamsDto {
  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'Juazeiro do Norte',
    required: false,
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  state_id: string;

  static toDto(payload: CityParamsDto): CityParamsDto {
    return plainToInstance(CityParamsDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
