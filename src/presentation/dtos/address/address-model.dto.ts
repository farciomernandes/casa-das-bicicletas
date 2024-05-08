import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserModelDto } from '../user/user-model.dto';
import { CityModel } from '../city/city-model.dto';

export class AddressModelDto {
  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: '12345-678',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  zip_code: string;

  @ApiProperty({
    type: String,
    example: 'Street 123',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    type: String,
    example: '123',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    type: String,
    example: 'Apartment 101',
    required: false,
  })
  @Expose()
  @IsString()
  complement?: string;

  @ApiProperty({
    type: String,
    example: 'Nice Neighborhood',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty({
    type: CityModel,
    example: CityModel,
    required: false,
  })
  @Expose()
  city: CityModel;

  static toDto(payload: AddressModelDto): AddressModelDto {
    return plainToInstance(AddressModelDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
