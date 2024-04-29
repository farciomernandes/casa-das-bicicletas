import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class UpdateProductVariablesModel {
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
  quantity: number;

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

  @ApiProperty({
    type: String,
    example: 'Madeira Top',
  })
  @Expose()
  type: string;

  @ApiProperty({
    type: Number,
    example: 1.5,
    description: 'Peso',
  })
  @Expose()
  weight: number;

  @ApiProperty({
    type: Number,
    example: 'Violão G',
    description: 'Formato do produto',
  })
  @Expose()
  format: string;

  @ApiProperty({
    type: Number,
    example: 30,
    description: 'Comprimento',
  })
  @Expose()
  length: number;

  @ApiProperty({
    type: Number,
    example: 20,
    description: 'Altura',
  })
  @Expose()
  height: number;

  @ApiProperty({
    type: Number,
    example: 10,
    description: 'Largura',
  })
  @Expose()
  width: number;

  @ApiProperty({
    type: Number,
    example: 10,
    description: 'Diametro',
  })
  @Expose()
  diameter: number;

  static toDto(
    payload: UpdateProductVariablesModel,
  ): UpdateProductVariablesModel {
    return plainToInstance(UpdateProductVariablesModel, payload, {
      excludeExtraneousValues: true,
    });
  }
}
