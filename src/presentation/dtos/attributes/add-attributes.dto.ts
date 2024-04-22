import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class AddAttributesModel {
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

  static toDto(payload: AddAttributesModel): AddAttributesModel {
    return plainToInstance(AddAttributesModel, payload, {
      excludeExtraneousValues: true,
    });
  }
}
