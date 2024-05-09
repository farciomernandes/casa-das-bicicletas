import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { RoleModel } from '../role/role-model.dto';
import { AddressModelDto } from '../address/address-model.dto';

export class UserModelDto {
  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'example@example.com',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    example: 'John Doe',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: '12345678900',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({
    type: String,
    example: '123456789',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({
    type: String,
    example: 'Male',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  sex: string;

  @ApiProperty({
    type: String,
    example: '1990-01-01',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  birthdate: string;

  @ApiProperty({
    type: String,
    example: '1234567890',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: RoleModel,
    example: RoleModel,
  })
  @Expose()
  role: RoleModel;

  @ApiProperty({
    type: AddressModelDto,
    example: AddressModelDto,
  })
  @Expose()
  address: AddressModelDto;

  static toDto(payload: any): UserModelDto {
    const user = plainToClass(UserModelDto, payload, {
      excludeExtraneousValues: true,
    });
    const role = RoleModel.toDto(payload.role);

    return {
      ...user,
      role,
    };
  }
}

export class GetAllUsersDto {
  @ApiProperty({
    type: Number,
    example: 20,
    required: false,
  })
  @Expose()
  total: number;

  @ApiProperty({
    type: UserModelDto,
    example: UserModelDto,
  })
  @Expose()
  users: UserModelDto;

  static toDto(payload: any): GetAllUsersDto {
    return plainToClass(GetAllUsersDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'example@example.com',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    example: 'John Doe',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: '12345678900',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({
    type: String,
    example: '123456789',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({
    type: String,
    example: 'Male',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  sex: string;

  @ApiProperty({
    type: String,
    example: '1990-01-01',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  birthdate: string;

  @ApiProperty({
    type: String,
    example: '1234567890',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  phone: string;
}
