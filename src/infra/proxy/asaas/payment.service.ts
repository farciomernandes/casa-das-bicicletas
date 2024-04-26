import { BadRequestException, Injectable } from '@nestjs/common';
import { AsaasCreateCustomer } from '@/core/domain/protocols/asaas/create-customer';
import { AsaasCreateTransaction } from '@/core/domain/protocols/asaas/create-transaction';
import { IPaymentProcess } from '@/core/domain/protocols/asaas/payment-process';
import { AxiosAdapter } from '@/infra/adapters/axios-adapter';
import { PaymentDataDto } from '@/presentation/dtos/checkout/process-payment.dto';
import { OrderModel } from '@/presentation/dtos/order/order-model.dto';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';
import { OrderStatusEnum } from '@/shared/enums/order_status.enum';
import { PaymentMethodEnum } from '@/shared/enums/payment_method.enum';
import { PixTransactionDto } from '@/presentation/dtos/asaas/payment-pix.dto';

@Injectable()
export default class PaymentService
  implements IPaymentProcess, AsaasCreateCustomer, AsaasCreateTransaction
{
  constructor(private readonly axiosAdapter: AxiosAdapter) {}

  async process(
    order: OrderModel,
    user: UserModelDto,
    payment: PaymentDataDto,
  ): Promise<{
    transaction_id: string;
    status: OrderStatusEnum;
    transaction: any;
  }> {
    try {
      const user_id = await this.createCustomer(user);
      const response = await this.createTransaction(
        user_id,
        order,
        user,
        payment,
      );

      if (payment.method == PaymentMethodEnum.PIX) {
        return {
          transaction_id: response.transactionId,
          status: OrderStatusEnum.PENDING,
          transaction: PixTransactionDto.toDto(response),
        };
      }

      return {
        transaction_id: response.transactionId,
        status: OrderStatusEnum.PENDING,
        transaction: PixTransactionDto.toDto(response),
      };
    } catch (error) {
      throw new BadRequestException(
        `Failed to process payment: ${error.message}`,
      );
    }
  }

  async createCustomer(user: UserModelDto): Promise<string> {
    try {
      const userResponse = await this.axiosAdapter.get(
        `/customers?email=${user.email}`,
      );

      if (userResponse?.data?.length > 0) {
        return userResponse.data[0]?.id;
      }

      const userParams = {
        name: user.name,
        email: user.email,
        mobilePhone: user.phone,
        cpfCnpj: user.cpf,
        postalCode: user.address.zip_code,
        address: user.address.street,
        addressNumber: user.address.number,
        complement: user.address.complement,
        province: user.address.neighborhood,
        notificationDisabled: true,
      };

      const response = await this.axiosAdapter.post('/customers', userParams);

      return response?.data?.id;
    } catch (error) {
      throw new BadRequestException(`Failed to create user: ${error.message}`);
    }
  }

  async createTransaction(
    user_id: string,
    order: OrderModel,
    user: UserModelDto,
    payment: PaymentDataDto,
  ): Promise<any> {
    try {
      const baseParams = {
        customer: user_id,
        dueDate: new Date().toISOString(),
        value: order.total,
        description: `Casa das bicicletas - Pedido #${order.id}`,
        externalReference: `${payment.method} - ${order.id}`,
      };

      if (payment.method == PaymentMethodEnum.CREDIT_CARD) {
        const paymentParams = {
          ...baseParams,
          billingType: PaymentMethodEnum.CREDIT_CARD,
          creditCard: {
            holderName: payment.creditCardHolder,
            number: payment.creditCardNumber,
            expiryMonth: payment.creditCardExpiration?.split('/')[0],
            expiryYear: payment.creditCardExpiration?.split('/')[1],
            ccv: payment.creditCardSecurityCode,
          },
          creditCardHolderInfo: {
            name: user.name,
            email: user.email,
            cpfCnpj: user.cpf,
            postalCode: user.address.zip_code,
            addressNumber: user.address.number,
            addressComplement: user.address.complement,
            phone: user.phone,
            mobilePhone: user.phone,
          },
        };

        const response = await this.axiosAdapter.post(
          '/payments/',
          paymentParams,
        );

        return {
          transactionId: response?.data?.id,
          gatewayStatus: response?.data?.status,
        };
      } else if (payment.method == PaymentMethodEnum.BOLETO) {
        const paymentParams = {
          ...baseParams,
          billingType: PaymentMethodEnum.BOLETO,
        };
        const response = await this.axiosAdapter.post(
          '/payments/',
          paymentParams,
        );
        return {
          transactionId: response?.data?.id,
          gatewayStatus: response?.data?.status,
        };
      } else {
        const paymentParams = {
          ...baseParams,
          billingType: PaymentMethodEnum.PIX,
        };
        return await this.axiosAdapter.post('/payments/', paymentParams);
      }
    } catch (error) {
      throw new BadRequestException(
        `Failed to create transaction: ${error.message}`,
      );
    }
  }
}
