import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';

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

  static toDto(payload: OrderModel): OrderModel {
    return plainToClass(OrderModel, payload, {
      excludeExtraneousValues: true,
    });
  }
}
