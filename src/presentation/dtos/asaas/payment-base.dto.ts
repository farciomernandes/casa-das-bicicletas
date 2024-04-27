import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type, plainToInstance } from 'class-transformer';

export class CreditCardDto {
  @ApiProperty()
  @Expose({ name: 'creditCardNumber' })
  creditCardNumber: string;

  @ApiProperty()
  @Expose({ name: 'creditCardBrand' })
  creditCardBrand: string;

  @ApiProperty()
  @Expose({ name: 'creditCardToken' })
  creditCardToken: string;

  static toDto(payload: any): CreditCardDto {
    return plainToInstance(CreditCardDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}

export class PaymentDto {
  @ApiProperty()
  @Expose()
  object: string;

  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  dateCreated: string;

  @ApiProperty()
  @Expose()
  customer: string;

  @ApiProperty()
  @Expose()
  paymentLink: string;

  @ApiProperty()
  @Expose()
  value: number;

  @ApiProperty()
  @Expose()
  netValue: number;

  @ApiProperty()
  @Expose()
  originalValue: number;

  @ApiProperty()
  @Expose()
  interestValue: number;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  billingType: string;

  @ApiProperty()
  @Expose()
  confirmedDate: string;

  @ApiProperty()
  @Expose()
  pixTransaction: string;

  @ApiProperty()
  @Expose()
  status: string;

  @ApiProperty()
  @Expose()
  dueDate: string;

  @ApiProperty()
  @Expose()
  originalDueDate: string;

  @ApiProperty()
  @Expose()
  paymentDate: string;

  @ApiProperty()
  @Expose()
  clientPaymentDate: string;

  @ApiProperty()
  @Expose()
  installmentNumber: number;

  @ApiProperty()
  @Expose()
  invoiceUrl: string;

  @ApiProperty()
  @Expose()
  invoiceNumber: string;

  @ApiProperty()
  @Expose()
  externalReference: string;

  @ApiProperty()
  @Expose()
  deleted: boolean;

  @ApiProperty()
  @Expose()
  anticipated: boolean;

  @ApiProperty()
  @Expose()
  anticipable: boolean;

  @ApiProperty()
  @Expose()
  creditDate: string;

  @ApiProperty()
  @Expose()
  estimatedCreditDate: string;

  @ApiProperty()
  @Expose()
  transactionReceiptUrl: string;

  @ApiProperty()
  @Expose()
  nossoNumero: string;

  @ApiProperty()
  @Expose()
  bankSlipUrl: string;

  @ApiProperty()
  @Expose()
  lastInvoiceViewedDate: string;

  @ApiProperty()
  @Expose()
  lastBankSlipViewedDate: string;

  @ApiProperty()
  @Expose()
  postalService: boolean;

  @ApiProperty()
  @Expose()
  custody: string;

  @ApiProperty()
  @Expose()
  refunds: string;

  @ApiProperty()
  @Expose()
  @Type(() => CreditCardDto)
  @Transform(({ value }) => (value ? value : null), { toClassOnly: true })
  creditCard: CreditCardDto;

  static toDto(payload: any): PaymentDto {
    return plainToInstance(PaymentDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
