import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, IsNumber } from 'class-validator';

export class AddProductVariablesModel {
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
  quantity: number;

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

  @ApiProperty({
    type: String,
    example: 'Ferro nobre',
    required: true,
  })
  @Expose()
  @IsString()
  type: string;

  @ApiProperty({
    type: Number,
    example: 1.5,
    required: true,
  })
  @Expose()
  @IsNumber()
  weight: number;

  @ApiProperty({
    type: String,
    example: 'Triangular',
    required: true,
  })
  @Expose()
  @IsString()
  format: string;

  @ApiProperty({
    type: Number,
    example: 30,
    required: true,
  })
  @Expose()
  @IsNumber()
  length: number;

  @ApiProperty({
    type: Number,
    example: 20,
    required: true,
  })
  @Expose()
  @IsNumber()
  height: number;

  @ApiProperty({
    type: Number,
    example: 10,
    required: true,
  })
  @Expose()
  @IsNumber()
  width: number;

  @ApiProperty({
    type: Number,
    example: 10,
    required: true,
  })
  @Expose()
  @IsNumber()
  diameter: number;

  static toDto(payload: AddProductVariablesModel): AddProductVariablesModel {
    return plainToInstance(AddProductVariablesModel, payload, {
      excludeExtraneousValues: true,
    });
  }
}
