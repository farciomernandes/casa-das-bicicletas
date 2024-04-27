import { ApiProperty } from '@nestjs/swagger';
import { ProductModelDto } from '../product/product-model.dto';
import { UserOrderDto } from '../order/order-model.dto';
import { CreditCardDto } from './payment-base.dto';

class OrderItemDto {
  @ApiProperty({
    description: 'ID do item do pedido',
    example: '24cb9518-6e3e-4636-9541-3a59b914243f',
  })
  id: string;

  @ApiProperty({ description: 'Quantidade do item do pedido', example: 5 })
  quantity: number;

  @ApiProperty({ description: 'Subtotal do item do pedido', example: 500 })
  subTotal: number;

  @ApiProperty({ description: 'Informações do produto', type: ProductModelDto })
  product: ProductModelDto;
}

class PaymentDto {
  @ApiProperty({ description: 'Objeto do pagamento', example: 'payment' })
  object: string;

  @ApiProperty({
    description: 'ID do pagamento',
    example: 'pay_j9xsyctcgnoampva',
  })
  id: string;

  @ApiProperty({
    description: 'Data de criação do pagamento',
    example: '2024-04-27',
  })
  dateCreated: string;

  @ApiProperty({
    description: 'Cliente do pagamento',
    example: 'cus_000005976947',
  })
  customer: string;

  @ApiProperty({ description: 'Link do pagamento', example: null })
  paymentLink: string | null;

  @ApiProperty({ description: 'Valor do pagamento', example: 500 })
  value: number;

  @ApiProperty({ description: 'Valor líquido do pagamento', example: 489.56 })
  netValue: number;

  @ApiProperty({ description: 'Valor original do pagamento', example: null })
  originalValue: number | null;

  @ApiProperty({ description: 'Valor do juros', example: null })
  interestValue: number | null;

  @ApiProperty({
    description: 'Descrição do pagamento',
    example:
      'Casa das bicicletas - Pedido #b4ad52dc-3392-4a34-8437-49069930619a',
  })
  description: string;

  @ApiProperty({ description: 'Tipo de faturamento', example: 'CREDIT_CARD' })
  billingType: string;

  @ApiProperty({
    description: 'Data de confirmação do pagamento',
    example: '2024-04-27',
  })
  confirmedDate: string;

  @ApiProperty({ description: 'Transação PIX', example: null })
  pixTransaction: any | null;

  @ApiProperty({ description: 'Status do pagamento', example: 'CONFIRMED' })
  status: string;

  @ApiProperty({ description: 'Data de vencimento', example: '2024-04-27' })
  dueDate: string;

  @ApiProperty({
    description: 'Data de vencimento original',
    example: '2024-04-27',
  })
  originalDueDate: string;

  @ApiProperty({ description: 'Data do pagamento', example: null })
  paymentDate: string | null;

  @ApiProperty({
    description: 'Data do pagamento pelo cliente',
    example: '2024-04-27',
  })
  clientPaymentDate: string;

  @ApiProperty({ description: 'Número de parcelas', example: null })
  installmentNumber: number | null;

  @ApiProperty({
    description: 'URL da fatura',
    example: 'https://sandbox.asaas.com/i/j9xsyctcgnoampva',
  })
  invoiceUrl: string;

  @ApiProperty({ description: 'Número da fatura', example: '05632657' })
  invoiceNumber: string;

  @ApiProperty({
    description: 'Referência externa',
    example: 'CREDIT_CARD - b4ad52dc-3392-4a34-8437-49069930619a',
  })
  externalReference: string;

  @ApiProperty({ description: 'Indicador de exclusão', example: false })
  deleted: boolean;

  @ApiProperty({ description: 'Antecipado', example: false })
  anticipated: boolean;

  @ApiProperty({ description: 'Antecipável', example: false })
  anticipable: boolean;

  @ApiProperty({ description: 'Data de crédito', example: '2024-05-29' })
  creditDate: string;

  @ApiProperty({
    description: 'Data de crédito estimada',
    example: '2024-05-29',
  })
  estimatedCreditDate: string;

  @ApiProperty({
    description: 'URL do comprovante da transação',
    example: 'https://sandbox.asaas.com/comprovantes/3759477174951690',
  })
  transactionReceiptUrl: string;

  @ApiProperty({ description: 'Nosso número', example: null })
  nossoNumero: string | null;

  @ApiProperty({ description: 'URL do boleto bancário', example: null })
  bankSlipUrl: string | null;

  @ApiProperty({
    description: 'Data da última visualização da fatura',
    example: null,
  })
  lastInvoiceViewedDate: string | null;

  @ApiProperty({
    description: 'Data da última visualização do boleto bancário',
    example: null,
  })
  lastBankSlipViewedDate: string | null;

  @ApiProperty({ description: 'Serviço postal', example: false })
  postalService: boolean;

  @ApiProperty({ description: 'Custódia', example: null })
  custody: any | null;

  @ApiProperty({ description: 'Reembolsos', example: null })
  refunds: any | null;

  @ApiProperty({
    description: 'Informações do cartão de crédito',
    type: CreditCardDto,
  })
  creditCard: CreditCardDto;
}

export class PaymentCreditCardDto {
  @ApiProperty({ description: 'Informações do pagamento', type: PaymentDto })
  transaction: PaymentDto;

  @ApiProperty({ description: 'Informações do usuário', type: UserOrderDto })
  user: UserOrderDto;

  @ApiProperty({ description: 'Itens do pedido', type: [OrderItemDto] })
  orderItems: OrderItemDto[];
}
