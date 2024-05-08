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

  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: true,
  })
  @Expose()
  state_id: string;

  static toDto(payload: CityModel): CityModel {
    return plainToInstance(CityModel, payload, {
      excludeExtraneousValues: true,
    });
  }
}

export class CityListDto {
  @ApiProperty({
    type: CityModel,
    example: CityModel,
    required: true,
    isArray: true,
  })
  @Expose()
  cities: CityModel[];

  @ApiProperty({
    type: Number,
    example: 200,
    required: true,
  })
  @Expose()
  total: number;

  static toDto(payload: CityListDto): CityListDto {
    return plainToInstance(CityListDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
