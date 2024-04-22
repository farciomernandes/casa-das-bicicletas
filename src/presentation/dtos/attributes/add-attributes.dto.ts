import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

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

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  image_link: string;

  @ApiProperty({
    type: String,
    example: '994fb2cd-0f39-4a71-b15c-333b7e2ff793',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  product_id: string;

  static toDto(payload: AddAttributesModel): AddAttributesModel {
    return plainToInstance(AddAttributesModel, payload, {
      excludeExtraneousValues: true,
    });
  }
}
