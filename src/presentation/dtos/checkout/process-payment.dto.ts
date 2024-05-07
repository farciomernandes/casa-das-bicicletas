import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Matches, IsEnum, IsOptional } from 'class-validator';
import { PaymentMethodEnum } from '@/shared/enums/payment_method.enum';

export class PaymentDataDto {
  @ApiProperty({
    type: String,
    example: '5162306219378829',
    description: 'Número do cartão de crédito',
  })
  @Matches(/^\d{16}$/)
  @IsOptional()
  @Expose()
  creditCardNumber: string;

  @ApiProperty({
    type: String,
    example: 'marcelo h almeida',
    description: 'Nome do titular do cartão de crédito',
  })
  @Expose()
  @IsOptional()
  creditCardHolder: string;

  @ApiProperty({
    type: String,
    example: '05/25',
    description: 'Data de validade do cartão de crédito',
  })
  @Matches(/^\d{2}\/\d{2}$/)
  @Expose()
  @IsOptional()
  creditCardExpiration: string;

  @ApiProperty({
    type: String,
    example: '318',
    description: 'Código de segurança do cartão de crédito',
  })
  @Matches(/^\d{3}$/)
  @Expose()
  @IsOptional()
  creditCardSecurityCode: string;

  @ApiProperty({
    type: String,
    example: 'CREDIT_CARD',
    description: 'Método de pagamento (CREDIT_CARD, BOLETO, PIX)',
  })
  @IsEnum(PaymentMethodEnum)
  @Expose()
  @IsOptional()
  method: string;
}

export class CheckoutOrderDto {
  @ApiProperty({
    type: PaymentDataDto,
    example: PaymentDataDto,
  })
  @Expose()
  payment: PaymentDataDto;

  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
  })
  @Expose()
  address_id: string;
}
