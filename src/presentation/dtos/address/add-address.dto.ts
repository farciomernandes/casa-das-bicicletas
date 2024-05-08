import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';

export class AddAddressDto {
  @ApiProperty({
    type: String,
    example: '12345-678',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  zip_code: string;

  @ApiProperty({
    type: String,
    example: 'Rua Principal',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({
    type: String,
    example: '123',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  number: string;

  @ApiProperty({
    type: String,
    example: 'Complemento',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  complement?: string;

  @ApiProperty({
    type: String,
    example: 'Bairro',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  city_id: string;

  static toDto(payload: AddAddressDto): AddAddressDto {
    return plainToInstance(AddAddressDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
