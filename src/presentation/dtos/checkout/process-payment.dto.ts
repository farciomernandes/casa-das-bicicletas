import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class PaymentDataDto {
  @ApiProperty({
    type: String,
    example: '4444444444444444',
    description: 'Número do cartão de crédito',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{16}$/)
  @Expose()
  creditCardNumber: string;

  @ApiProperty({
    type: String,
    example: 'John Doe',
    description: 'Nome do titular do cartão de crédito',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  creditCardHolder: string;

  @ApiProperty({
    type: String,
    example: 'MM/YY',
    description: 'Data de validade do cartão de crédito (MM/YY)',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{2}\/\d{2}$/)
  @Expose()
  creditCardExpiration: string;

  @ApiProperty({
    type: String,
    example: '123',
    description: 'Código de segurança do cartão de crédito',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{3}$/)
  @Expose()
  creditCardSecurityCode: string;
}
