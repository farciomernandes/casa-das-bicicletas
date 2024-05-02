import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, plainToInstance } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CategoryLocallylDto {
  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'Category Name',
    required: true,
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Category Description',
    required: true,
  })
  @Expose()
  description: string;

  static toDto(payload: CategoryLocallylDto): CategoryLocallylDto {
    return plainToInstance(CategoryLocallylDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}

export class UserOrderDto {
  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'example@example.com',
  })
  @Expose()
  email: string;

  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: String,
    example: '12345678900',
  })
  @Expose()
  cpf: string;

  @ApiProperty({
    type: String,
    example: '123456789',
  })
  @Expose()
  document: string;

  @ApiProperty({
    type: String,
    example: 'Male',
  })
  @Expose()
  sex: string;

  @ApiProperty({
    type: String,
    example: '1990-01-01',
  })
  @Expose()
  birthdate: string;

  @ApiProperty({
    type: String,
    example: '1234567890',
  })
  @Expose()
  phone: string;

  static toDto(payload: UserOrderDto): UserOrderDto {
    return plainToClass(UserOrderDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}

export class ProductOrderDto {
  @ApiProperty({
    type: String,
    example: '994fb2cd-0f39-4a71-b15c-333b7e2ff793',
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'Product Name',
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: CategoryLocallylDto,
    example: CategoryLocallylDto,
  })
  @Expose()
  category: CategoryLocallylDto;

  @ApiProperty({
    type: String,
    example: 'Product Description',
  })
  @Expose()
  description: string;

  @ApiProperty({
    type: String,
    example: 'Large Product Description',
  })
  @Expose()
  large_description: string;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @Expose()
  price: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @Expose()
  installment_count: number;

  @ApiProperty({
    type: Number,
    example: 100,
  })
  @Expose()
  installment_value: number;

  @ApiProperty({
    type: Number,
    example: 90,
  })
  @Expose()
  discount_price: number;

  @ApiProperty({
    type: Number,
    example: 10,
    required: true,
  })
  @Expose()
  discount_percent: number;

  @ApiProperty({
    type: String,
    example: 'SKU123',
  })
  @Expose()
  sku: string;

  static toDto(payload: ProductOrderDto): ProductOrderDto {
    return plainToInstance(ProductOrderDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}

export class OrderItemLocally {
  @ApiProperty({
    type: String,
    example: 'OrderItem ID',
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @Expose()
  quantity: number;

  @ApiProperty({
    type: Number,
    example: 20,
  })
  @Expose()
  sub_total: number;

  @ApiProperty({
    required: true,
  })
  @Expose()
  product_variables: any;

  static toDto(payload: OrderItemLocally): OrderItemLocally {
    return plainToClass(OrderItemLocally, payload, {
      excludeExtraneousValues: true,
    });
  }
}

export class OrderModel {
  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'PENDING',
    enum: ['PENDING', 'PAID', 'CANCELED'],
    required: true,
  })
  @Expose()
  status: string;

  @ApiProperty({
    type: Number,
    example: 100.5,
    required: true,
  })
  @Expose()
  total: number;

  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  transaction_id?: string;

  @ApiProperty({
    type: UserOrderDto,
    required: true,
  })
  @Expose()
  user: UserOrderDto;

  @ApiProperty({
    type: [OrderItemLocally],
    example: [
      {
        id: '65bd52691a0f4c3b57819a4b',
        quantity: 2,
        sub_total: 50.75,
        product: {
          id: '994fb2cd-0f39-4a71-b15c-333b7e2ff793',
          name: 'Product Name',
          category: {
            id: '65bd52691a0f4c3b57819a4b',
            name: 'Category Name',
          },
          description: 'Product Description',
          large_description: 'Large Product Description',
          price: 25.5,
          discount_price: 20.75,
          discount_percent: 10,
          sku: 'SKU123',
        },
      },
    ],
    isArray: true,
  })
  @Expose()
  @IsOptional()
  order_items: OrderItemLocally[];

  static toDto(payload: OrderModel): OrderModel {
    return plainToClass(OrderModel, payload, {
      excludeExtraneousValues: true,
    });
  }
}
