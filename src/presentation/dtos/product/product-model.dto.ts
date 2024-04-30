import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CategoryModelDto } from '../category/category-model.dto';
import { ProductVariablesModel } from '../product_variable/product_variables-model.dto';

export class ProductModelDto {
  @ApiProperty({
    type: String,
    example: 'Product ID',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'Product Name',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: CategoryModelDto,
    example: CategoryModelDto,
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @ValidateNested()
  category: CategoryModelDto;

  @ApiProperty({
    type: String,
    example: 'Product Description',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: String,
    example: 'Large Product Description',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  large_description: string;

  @ApiProperty({
    type: Number,
    example: 100,
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  installment_count: number;

  @ApiProperty({
    type: Number,
    example: 100,
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  installment_value: number;

  @ApiProperty({
    type: Number,
    example: 90,
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  discount_price: number;

  @ApiProperty({
    type: Number,
    example: 10,
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  discount_percent: number;

  @ApiProperty({
    type: String,
    example: 'SKU123',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  sku: string;

  @ApiProperty({
    type: ProductVariablesModel,
    required: true,
    isArray: true,
  })
  @Expose()
  product_variables: ProductVariablesModel[];

  static toDto(payload: any): ProductModelDto {
    return plainToClass(ProductModelDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
