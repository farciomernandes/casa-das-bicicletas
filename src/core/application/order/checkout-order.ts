import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/protocols/repositories/user';
import { PaymentDataDto } from '@/presentation/dtos/checkout/process-payment.dto';
import { IDbAddOrderRepository } from '@/core/domain/protocols/db/order/add-order-repository';
import { IDbUpdateOrderRepository } from '@/core/domain/protocols/db/order/update-order-repository';
import { ICheckoutOrder } from '@/core/domain/protocols/payment/checkout-order';
import { IPaymentProcess } from '@/core/domain/protocols/asaas/payment-process';
import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';

@Injectable()
export class CheckoutOrder implements ICheckoutOrder {
  constructor(
    private userRepository: UserRepository,
    private dbAddOrder: IDbAddOrderRepository,
    private dbUpdateOrder: IDbUpdateOrderRepository,
    private paymentService: IPaymentProcess,
  ) {}

  async process(
    order: AddOrderDto,
    user_id: string,
    payment: PaymentDataDto,
  ): Promise<{ id: string; transaction_id: string; status: string }> {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new BadRequestException(`User with id ${user_id} not found`);
    }
    const orderCreated = await this.dbAddOrder.create(order);
    const { transaction_id, status } = await this.paymentService.process(
      orderCreated,
      user,
      payment,
    );

    await this.dbUpdateOrder.update(
      {
        ...orderCreated,
        transaction_id,
        status,
      },
      orderCreated.id,
    );

    return {
      id: orderCreated.id,
      transaction_id,
      status: orderCreated.status,
    };
  }
}
