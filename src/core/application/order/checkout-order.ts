import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from '../../domain/protocols/repositories/user';
import { CheckoutOrderDto } from '@/presentation/dtos/checkout/process-payment.dto';
import { IDbUpdateOrderRepository } from '@/core/domain/protocols/db/order/update-order-repository';
import { ICheckoutOrder } from '@/core/domain/protocols/payment/checkout-order';
import { IPaymentProcess } from '@/core/domain/protocols/asaas/payment-process';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { OrderStatusEnum } from '@/shared/enums/order_status.enum';
import { AddressRepository } from '@/core/domain/protocols/repositories/address';
import { AddressModelDto } from '@/presentation/dtos/address/address-model.dto';
import { CheckoutOrderModelDto } from '@/presentation/dtos/order/checkout-order.dto';

@Injectable()
export class CheckoutOrder implements ICheckoutOrder {
  constructor(
    private orderRepository: OrderRepository,
    private userRepository: UserRepository,
    private dbUpdateOrder: IDbUpdateOrderRepository,
    private paymentService: IPaymentProcess,
    private addressRepository: AddressRepository,
  ) {}

  async process(
    order_id: string,
    user_id: string,
    payment: CheckoutOrderDto,
  ): Promise<CheckoutOrderModelDto> {
    try {
      const user = await this.userRepository.findById(user_id);
      if (!user) {
        throw new BadRequestException(`User with id ${user_id} not found`);
      }
      const order = await this.orderRepository.findById(order_id);
      if (!order) {
        throw new BadRequestException(`Order with id ${user_id} not found`);
      }

      if (order.status == OrderStatusEnum.PAID) {
        throw new BadRequestException(`Order is paid!`);
      }
      const address = await this.addressRepository.findById(payment.address_id);

      if (!address) {
        throw new BadRequestException(
          `Address with id ${payment.address_id} not found`,
        );
      }
      const { transaction_id, status, transaction } =
        await this.paymentService.process(
          {
            id: order.id,
            order_items: order.order_items,
            status: order.status,
            total: order.total,
            user: order.user,
          },
          user,
          payment.payment,
          AddressModelDto.toDto(address),
        );

      const updated = await this.dbUpdateOrder.update(
        {
          ...order,
          transaction_id,
          status,
          address_id: address.id,
        },
        order.id,
      );

      return {
        transaction,
        order: updated,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
