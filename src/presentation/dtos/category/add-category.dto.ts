import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';

export class AddCategoryDto {
  @ApiProperty({
    type: String,
    example: 'Category Name',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Image Link',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  image_link: string;

  @ApiProperty({
    type: String,
    example: 'Category Description',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  description: string;

  static toDto(payload: AddCategoryDto): AddCategoryDto {
    return plainToClass(AddCategoryDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
