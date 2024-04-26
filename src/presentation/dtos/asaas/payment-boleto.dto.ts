import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate, IsUrl } from 'class-validator';

export class BoletoTransactionDto {
  @ApiProperty({
    type: String,
    example: 'pay_kaiequ29qv00oo3t',
    description: 'ID da transação de boleto',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: '2024-04-26',
    description: 'Data de criação da transação',
  })
  @IsNotEmpty()
  @IsDate()
  @Expose()
  dateCreated: Date;

  @ApiProperty({
    type: Number,
    example: 200,
    description: 'Valor da transação',
  })
  @IsNotEmpty()
  @Expose()
  value: number;

  @ApiProperty({
    type: String,
    example:
      'Casa das bicicletas - Pedido #19698b03-f359-4dc2-b5e6-0971aa160b70',
    description: 'Descrição da transação',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  description: string;

  @ApiProperty({
    type: String,
    example: 'BOLETO',
    description: 'Tipo de cobrança',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  billingType: string;

  @ApiProperty({
    type: String,
    example: 'PENDING',
    description: 'Status da transação',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  status: string;

  @ApiProperty({
    type: String,
    example: 'https://sandbox.asaas.com/i/kaiequ29qv00oo3t',
    description: 'URL da fatura',
  })
  @IsNotEmpty()
  @IsUrl()
  @Expose()
  invoiceUrl: string;

  @ApiProperty({
    type: String,
    example: '05625668',
    description: 'Número da fatura',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  invoiceNumber: string;

  @ApiProperty({
    type: String,
    example: 'BOLETO - 19698b03-f359-4dc2-b5e6-0971aa160b70',
    description: 'Referência externa da transação de boleto',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  externalReference: string;

  @ApiProperty({
    type: String,
    example: '1592786',
    description: 'Nosso número do boleto',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  nossoNumero: string;

  @ApiProperty({
    type: String,
    example: 'https://sandbox.asaas.com/b/pdf/kaiequ29qv00oo3t',
    description: 'URL do boleto',
  })
  @IsNotEmpty()
  @IsUrl()
  @Expose()
  bankSlipUrl: string;

  static toDto(payload: any): BoletoTransactionDto {
    return plainToInstance(BoletoTransactionDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
