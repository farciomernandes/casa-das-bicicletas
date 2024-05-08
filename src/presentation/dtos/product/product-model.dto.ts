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
    type: ProductVariablesModel,
    required: true,
    isArray: true,
  })
  @Expose()
  product_variables: ProductVariablesModel[];

  static toDto(payload: any): ProductModelDto {
    const product = plainToClass(ProductModelDto, payload, {
      excludeExtraneousValues: true,
    });
    const category = CategoryModelDto.toDto(payload.category);
    const product_variables = payload.product_variables.map((variable) =>
      ProductVariablesModel.toDto(variable),
    );

    return {
      ...product,
      category,
      product_variables,
    };
  }
}
