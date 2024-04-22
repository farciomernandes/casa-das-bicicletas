import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class UploadAddressDto {
  @ApiProperty({
    type: String,
    example: '12345-678',
  })
  @Expose()
  zip_code: string;

  @ApiProperty({
    type: String,
    example: 'Rua Principal',
  })
  @Expose()
  street: string;

  @ApiProperty({
    type: String,
    example: '123',
  })
  @Expose()
  number: string;

  @ApiProperty({
    type: String,
    example: 'Complemento',
    required: false,
  })
  @Expose()
  complement: string;

  @ApiProperty({
    type: String,
    example: 'Bairro',
  })
  @Expose()
  neighborhood: string;

  static toDto(payload: UploadAddressDto): UploadAddressDto {
    return plainToInstance(UploadAddressDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
