import { ApiProperty } from '@nestjs/swagger';

class CreditCardDto {
  @ApiProperty()
  creditCardNumber: string;

  @ApiProperty()
  creditCardBrand: string;

  @ApiProperty()
  creditCardToken: string;
}

export class PaymentDto {
  @ApiProperty()
  object: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  dateCreated: string;

  @ApiProperty()
  customer: string;

  @ApiProperty()
  paymentLink: string | null;

  @ApiProperty()
  value: number;

  @ApiProperty()
  netValue: number;

  @ApiProperty()
  originalValue: number | null;

  @ApiProperty()
  interestValue: number | null;

  @ApiProperty()
  description: string;

  @ApiProperty()
  billingType: string;

  @ApiProperty()
  confirmedDate: string;

  @ApiProperty({ type: CreditCardDto })
  creditCard: CreditCardDto;

  @ApiProperty()
  pixTransaction: any | null;

  @ApiProperty()
  status: string;

  @ApiProperty()
  dueDate: string;

  @ApiProperty()
  originalDueDate: string;

  @ApiProperty()
  paymentDate: string | null;

  @ApiProperty()
  clientPaymentDate: string;

  @ApiProperty()
  installmentNumber: number | null;

  @ApiProperty()
  invoiceUrl: string;

  @ApiProperty()
  invoiceNumber: string;

  @ApiProperty()
  externalReference: string;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  anticipated: boolean;

  @ApiProperty()
  anticipable: boolean;

  @ApiProperty()
  creditDate: string;

  @ApiProperty()
  estimatedCreditDate: string;

  @ApiProperty()
  transactionReceiptUrl: string;

  @ApiProperty()
  nossoNumero: string | null;

  @ApiProperty()
  bankSlipUrl: string | null;

  @ApiProperty()
  lastInvoiceViewedDate: string | null;

  @ApiProperty()
  lastBankSlipViewedDate: string | null;

  @ApiProperty()
  postalService: boolean;

  @ApiProperty()
  custody: any | null;

  @ApiProperty()
  refunds: any | null;
}

export class PaymentConfirmedDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  event: string;

  @ApiProperty({
    example: PaymentDto,
    type: PaymentDto,
  })
  payment: PaymentDto;
}
