import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate, IsUrl } from 'class-validator';

export class PixTransactionDto {
  @ApiProperty({
    type: String,
    example: 'pay_gfp0ugq8k7ahchuw',
    description: 'ID da transação PIX',
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
    example: 'Pedido #19698b03-f359-4dc2-b5e6-0971aa160b70',
    description: 'Descrição da transação',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  description: string;

  @ApiProperty({
    type: String,
    example: 'PIX',
    description: 'Tipo de cobrança',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  billingType: string;

  @ApiProperty({
    type: String,
    example: null,
    description: 'Detalhes da transação PIX',
    required: false,
  })
  @IsString()
  @Expose()
  pixTransaction: string | null;

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
    type: Date,
    example: '2024-04-26',
    description: 'Data de vencimento',
  })
  @IsNotEmpty()
  @IsDate()
  @Expose()
  dueDate: Date;

  @ApiProperty({
    type: String,
    example: 'https://sandbox.asaas.com/i/gfp0ugq8k7ahchuw',
    description: 'URL da fatura',
  })
  @IsNotEmpty()
  @IsUrl()
  @Expose()
  invoiceUrl: string;

  @ApiProperty({
    type: String,
    example: '05625548',
    description: 'Número da fatura',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  invoiceNumber: string;

  @ApiProperty({
    type: String,
    example: 'PIX - 19698b03-f359-4dc2-b5e6-0971aa160b70',
    description: 'Referência externa da transação PIX',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  externalReference: string;

  static toDto(payload: any): PixTransactionDto {
    return plainToInstance(PixTransactionDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
