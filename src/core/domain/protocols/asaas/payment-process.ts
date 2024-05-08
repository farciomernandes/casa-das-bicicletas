import { AddressModelDto } from '@/presentation/dtos/address/address-model.dto';
import { PaymentDto } from '@/presentation/dtos/asaas/payment-base.dto';
import { BoletoTransactionDto } from '@/presentation/dtos/asaas/payment-boleto.dto';
import { PixTransactionDto } from '@/presentation/dtos/asaas/payment-pix.dto';
import { PaymentDataDto } from '@/presentation/dtos/checkout/process-payment.dto';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';

export abstract class IPaymentProcess {
  abstract process(
    cart: any,
    user: UserModelDto,
    payment: PaymentDataDto,
    address: AddressModelDto,
  ): Promise<{
    transaction_id: string;
    status: string;
    transaction: PixTransactionDto | BoletoTransactionDto | PaymentDto;
  }>;
}
