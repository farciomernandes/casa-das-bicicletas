import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class PaymentDataDto {
  @ApiProperty({
    type: String,
    example: '5162306219378829',
    description: 'Número do cartão de crédito',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{16}$/)
  @Expose()
  creditCardNumber: string;

  @ApiProperty({
    type: String,
    example: 'marcelo h almeida',
    description: 'Nome do titular do cartão de crédito',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  creditCardHolder: string;

  @ApiProperty({
    type: String,
    example: 'MM/YY',
    description: 'Data de validade do cartão de crédito (05/25)',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{2}\/\d{2}$/)
  @Expose()
  creditCardExpiration: string;

  @ApiProperty({
    type: String,
    example: '318',
    description: 'Código de segurança do cartão de crédito',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{3}$/)
  @Expose()
  creditCardSecurityCode: string;
}
