import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class UpdateAttributesModel {
  @ApiProperty({
    type: String,
    example: 'blue',
  })
  @Expose()
  color: string;

  @ApiProperty({
    type: Number,
    example: 10,
  })
  @Expose()
  qtd: number;

  @ApiProperty({
    type: String,
    example: 'large',
  })
  @Expose()
  size: string;

  @ApiProperty({
    type: String,
    description: 'Image url',
  })
  @Expose()
  image_link: string;

  static toDto(payload: UpdateAttributesModel): UpdateAttributesModel {
    return plainToInstance(UpdateAttributesModel, payload, {
      excludeExtraneousValues: true,
    });
  }
}
