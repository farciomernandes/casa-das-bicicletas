import { BadRequestException, Injectable } from '@nestjs/common';
import { AsaasCreateCustomer } from '@/core/domain/protocols/asaas/create-customer';
import { AsaasCreateTransaction } from '@/core/domain/protocols/asaas/create-transaction';
import { IPaymentProcess } from '@/core/domain/protocols/asaas/payment-process';
import { AxiosAdapter } from '@/infra/adapters/axios-adapter';
import { PaymentDataDto } from '@/presentation/dtos/checkout/process-payment.dto';
import { OrderModel } from '@/presentation/dtos/order/order-model.dto';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';
import { OrderStatusEnum } from '@/shared/enums/order_status.enum';

@Injectable()
export default class PaymentService
  implements IPaymentProcess, AsaasCreateCustomer, AsaasCreateTransaction
{
  constructor(private readonly axiosAdapter: AxiosAdapter) {}

  async process(
    order: OrderModel,
    user: UserModelDto,
    payment: PaymentDataDto,
  ): Promise<{ transaction_id: string; status: OrderStatusEnum }> {
    try {
      const user_id = await this.createCustomer(user);
      const { transactionId, gatewayStatus } = await this.createTransaction(
        user_id,
        order,
        user,
        payment,
      );

      return {
        transaction_id: transactionId,
        status: OrderStatusEnum.PAID,
      };
    } catch (error) {
      console.error('Error on process payment: ', error);
      throw new BadRequestException(
        `Failed to process payment: ${error.message}`,
      );
    }
  }

  async createCustomer(user: UserModelDto): Promise<string> {
    try {
      const userResponse = await this.axiosAdapter.get(
        `/users?email=${user.email}`,
      );

      if (userResponse?.data?.length > 0) {
        return userResponse.data[0]?.id;
      }

      const userParams = {
        name: user.name,
        email: user.email,
        mobilePhone: user.phone,
        cpfCnpj: user.document,
        postalCode: user.address.zip_code,
        address: user.address.street,
        addressNumber: user.address.number,
        complement: user.address.complement,
        province: user.address.neighborhood,
        notificationDisabled: true,
      };

      const response = await this.axiosAdapter.post('/users', userParams);

      return response?.data?.id;
    } catch (error) {
      console.error('Error creating user: ', error);
      throw new BadRequestException(`Failed to create user: ${error.message}`);
    }
  }

  async createTransaction(
    user_id: string,
    order: OrderModel,
    user: UserModelDto,
    payment: PaymentDataDto,
  ): Promise<{ transactionId: string; gatewayStatus: string }> {
    try {
      const paymentParams = {
        user: user_id,
        billingType: 'CREDIT_CARD',
        dueDate: new Date().toISOString(),
        value: order.total,
        description: `Pedido #${order.id}`,
        externalReference: order.id,
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
          cpfCnpj: user.document,
          postalCode: user.address.zip_code,
          addressNumber: user.address.number,
          addressComplement: user.address.complement,
          mobilePhone: user.phone,
        },
      };

      const response = await this.axiosAdapter.post('/payments', paymentParams);

      return {
        transactionId: response?.data?.id,
        gatewayStatus: response?.data?.status,
      };
    } catch (error) {
      console.error('Error creating transaction: ', error);
      throw new BadRequestException(
        `Failed to create transaction: ${error.message}`,
      );
    }
  }
}
