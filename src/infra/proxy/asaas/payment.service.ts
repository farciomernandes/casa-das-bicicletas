import { AxiosAdapter } from '@/infra/adapters/axios-adapter';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';
import { OrderStatusEnum } from '@/shared/enums/order_status.enum';
import { BadGatewayException, Injectable } from '@nestjs/common';

@Injectable()
export default class PaymentService {
  constructor(private readonly axiosAdapter: AxiosAdapter) {}

  async process(
    order: any,
    user: UserModelDto,
    payment: any,
  ): Promise<{ transactionId: string; status: OrderStatusEnum }> {
    try {
      const userId = await this.createUser(user);
      const transaction = await this.createTransaction(
        userId,
        order,
        user,
        payment,
      );

      return {
        transactionId: transaction.transactionId,
        status: OrderStatusEnum.PAID,
      };
    } catch (error) {
      console.error('Error on process payment: ', error);
      return {
        transactionId: '',
        status: OrderStatusEnum.CANCELED,
      };
    }
  }

  private async createUser(user: UserModelDto): Promise<string> {
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
      throw new BadGatewayException(`Error payment gateway ${error.message}`);
    }
  }

  private async createTransaction(
    userId: string,
    order: any,
    user: UserModelDto,
    payment: any,
  ): Promise<{
    transactionId: string;
    gatewayStatus: string;
  }> {
    try {
      const paymentParams = {
        user: userId,
        billingType: 'CREDIT_CARD',
        dueDate: new Date().toISOString(),
        value: order.total,
        description: `Pedido #${order.id}`,
        externalReference: order.id.toString(),
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
          mobilePhone: user.password,
        },
      };

      const response = await this.axiosAdapter.post('/payments', paymentParams);

      return {
        transactionId: response?.data?.id,
        gatewayStatus: response?.data?.status,
      };
    } catch (error) {
      console.error('Error creating transaction: ', error);
      throw error;
    }
  }
}
