import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class StateModel {
  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'Ceará',
    required: true,
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: String,
    example: 'CE',
    required: true,
  })
  @Expose()
  uf: string;

  static toDto(payload: StateModel): StateModel {
    return plainToInstance(StateModel, payload, {
      excludeExtraneousValues: true,
    });
  }
}
