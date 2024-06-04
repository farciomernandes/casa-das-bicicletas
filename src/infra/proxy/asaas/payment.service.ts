import { BadRequestException, Injectable } from '@nestjs/common';
import { AsaasCreateCustomer } from '@/core/domain/protocols/asaas/create-customer';
import { AsaasCreateTransaction } from '@/core/domain/protocols/asaas/create-transaction';
import { IPaymentProcess } from '@/core/domain/protocols/asaas/payment-process';
import { AxiosAdapter } from '@/infra/adapters/axios-adapter';
import { PaymentDataDto } from '@/presentation/dtos/checkout/process-payment.dto';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';
import { OrderStatusEnum } from '@/shared/enums/order_status.enum';
import { PaymentMethodEnum } from '@/shared/enums/payment_method.enum';
import { PixTransactionDto } from '@/presentation/dtos/asaas/payment-pix.dto';
import { BoletoTransactionDto } from '@/presentation/dtos/asaas/payment-boleto.dto';
import {
  CreditCardDto,
  PaymentDto,
} from '@/presentation/dtos/asaas/payment-base.dto';
import { AddressModelDto } from '@/presentation/dtos/address/address-model.dto';
import { OrderModelDto } from '@/presentation/dtos/order/order-model.dto';

@Injectable()
export default class AsaasPaymentService
  implements IPaymentProcess, AsaasCreateCustomer, AsaasCreateTransaction
{
  constructor(private readonly axiosAdapter: AxiosAdapter) {}

  async process(
    order: OrderModelDto,
    user: UserModelDto,
    payment: PaymentDataDto,
    address: AddressModelDto,
  ): Promise<{
    transaction_id: string;
    status: OrderStatusEnum;
    transaction: PixTransactionDto | BoletoTransactionDto | PaymentDto;
  }> {
    try {
      const user_id = await this.createCustomer(user, address);
      const response = await this.createTransaction(
        user_id,
        order,
        user,
        payment,
        address,
      );

      if (payment.method == PaymentMethodEnum.PIX) {
        return {
          transaction_id: response.transactionId,
          status: OrderStatusEnum.PENDING,
          transaction: PixTransactionDto.toDto(response),
        };
      } else if (payment.method == PaymentMethodEnum.BOLETO) {
        return {
          transaction_id: response.transactionId,
          status: OrderStatusEnum.PENDING,
          transaction: BoletoTransactionDto.toDto(response),
        };
      }

      return {
        transaction_id: response.transactionId,
        status: OrderStatusEnum.PENDING,
        transaction: {
          ...PaymentDto.toDto(response),
          creditCard: CreditCardDto.toDto(response.creditCard),
        },
      };
    } catch (error) {
      throw new BadRequestException(
        `Failed to process AXIOS payment: ${error.message}`,
      );
    }
  }

  async createCustomer(
    user: UserModelDto,
    address: AddressModelDto,
  ): Promise<string> {
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
        postalCode: address.zip_code,
        address: address.street,
        addressNumber: Number(address.number),
        complement: address.complement,
        province: address.neighborhood,
        notificationDisabled: true,
      };

      const response = await this.axiosAdapter.post('/customers', userParams);

      return response?.data?.id;
    } catch (error) {
      throw new BadRequestException(
        `Failed to create AXIOS customer: ${error.message}`,
      );
    }
  }

  async createTransaction(
    user_id: string,
    order: any,
    user: UserModelDto,
    payment: PaymentDataDto,
    address: AddressModelDto,
  ): Promise<any> {
    try {
      const baseParams = {
        customer: user_id,
        dueDate: new Date().toISOString(),
        value: Number(order.total),
        description: `Casa das bicicletas - Pedido #${order.id}`,
        externalReference: `${payment.method} - ${order.id}`,
      };

      if (payment.method == PaymentMethodEnum.CREDIT_CARD) {
        const paymentParams = {
          ...baseParams,
          billingType: PaymentMethodEnum.CREDIT_CARD,
          creditCard: {
            holderName: payment.creditCardHolder,
            number: Number(payment.creditCardNumber),
            expiryMonth: payment.creditCardExpiration?.split('/')[0],
            expiryYear: payment.creditCardExpiration?.split('/')[1],
            ccv: payment.creditCardSecurityCode,
          },
          creditCardHolderInfo: {
            name: user.name,
            email: user.email,
            cpfCnpj: user.cpf,
            postalCode: address.zip_code,
            addressNumber: address.number,
            addressComplement: address.complement,
            phone: user.phone,
            mobilePhone: user.phone,
          },
        };

        const response = await this.axiosAdapter.post(
          '/payments/',
          paymentParams,
        );

        return response;
      } else if (payment.method == PaymentMethodEnum.BOLETO) {
        const paymentParams = {
          ...baseParams,
          billingType: PaymentMethodEnum.BOLETO,
        };
        const response = await this.axiosAdapter.post(
          '/payments/',
          paymentParams,
        );

        return response;
      } else {
        const paymentParams = {
          ...baseParams,
          billingType: PaymentMethodEnum.PIX,
        };
        return await this.axiosAdapter.post('/payments/', paymentParams);
      }
    } catch (error) {
      throw new BadRequestException(
        `Failed to create AXIOS transaction: ${error.message}`,
      );
    }
  }
}
