import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class AddStateDto {
  @ApiProperty({
    type: String,
    example: 'Ceara',
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

  static toDto(payload: AddStateDto): AddStateDto {
    return plainToInstance(AddStateDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
