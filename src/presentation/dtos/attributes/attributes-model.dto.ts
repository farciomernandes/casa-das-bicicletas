import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class AttributesModel {
  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'blue',
    required: true,
  })
  @Expose()
  color: string;

  @ApiProperty({
    type: Number,
    example: 10,
    required: true,
  })
  @Expose()
  qtd: number;

  @ApiProperty({
    type: String,
    example: 'large',
    required: true,
  })
  @Expose()
  size: string;

  @ApiProperty({
    type: String,
    example: '2024-04-20T10:00:00.000Z',
    required: false,
  })
  @Expose()
  created_at?: Date;

  @ApiProperty({
    type: String,
    example: '2024-04-20T12:00:00.000Z',
    required: false,
  })
  @Expose()
  updated_at?: Date;

  static toDto(payload: AttributesModel): AttributesModel {
    return plainToInstance(AttributesModel, payload, {
      excludeExtraneousValues: true,
    });
  }
}
