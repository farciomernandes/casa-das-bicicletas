import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { ProductVariablesModel } from '../product_variable/product_variables-model.dto';

export class OrderItemLocally {
  @ApiProperty({
    type: String,
    example: '4801d530-f7c6-4fb7-a04d-480d3a7adf40',
    required: true,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
  })
  @Expose()
  quantity: number;

  @ApiProperty({
    type: Number,
    example: 20,
    required: true,
  })
  @Expose()
  sub_total: number;

  @ApiProperty({
    type: ProductVariablesModel,
    required: true,
  })
  @Expose()
  product_variables: ProductVariablesModel;

  @ApiProperty({
    type: String,
    required: true,
  })
  @Expose()
  product_variables_id: string;

  @ApiProperty({
    type: Date,
    example: Date.now(),
    required: true,
  })
  @Expose()
  created_at: Date;

  static toDto(payload: OrderItemLocally): OrderItemLocally {
    const order_item = plainToClass(OrderItemLocally, payload, {
      excludeExtraneousValues: true,
    });

    const product_variables = ProductVariablesModel.toDto(
      payload.product_variables,
    );

    return {
      ...order_item,
      product_variables,
    };
  }
}
