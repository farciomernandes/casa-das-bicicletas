import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class CityModel {
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
    required: true,
  })
  @Expose()
  name: string;

  static toDto(payload: CityModel): CityModel {
    return plainToInstance(CityModel, payload, {
      excludeExtraneousValues: true,
    });
  }
}
