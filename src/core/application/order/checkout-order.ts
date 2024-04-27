import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from '../../domain/protocols/repositories/user';
import { PaymentDataDto } from '@/presentation/dtos/checkout/process-payment.dto';
import { IDbUpdateOrderRepository } from '@/core/domain/protocols/db/order/update-order-repository';
import { ICheckoutOrder } from '@/core/domain/protocols/payment/checkout-order';
import { IPaymentProcess } from '@/core/domain/protocols/asaas/payment-process';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import {
  OrderItemLocally,
  ProductOrderDto,
  UserOrderDto,
} from '@/presentation/dtos/order/order-model.dto';
import { OrderStatusEnum } from '@/shared/enums/order_status.enum';

@Injectable()
export class CheckoutOrder implements ICheckoutOrder {
  constructor(
    private orderRepository: OrderRepository,
    private userRepository: UserRepository,
    private dbUpdateOrder: IDbUpdateOrderRepository,
    private paymentService: IPaymentProcess,
  ) {}

  async process(
    order_id: string,
    user_id: string,
    payment: PaymentDataDto,
  ): Promise<any> {
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

      // ATUALIZAR A ORDER COM O QUE VEM
      const { transaction_id, status, transaction } =
        await this.paymentService.process(order, user, payment);

      await this.dbUpdateOrder.update(
        {
          ...order,
          transaction_id,
          status,
        },
        order.id,
      );

      return {
        transaction: transaction,
        user: UserOrderDto.toDto(order.user),
        order_items: order.order_items.map((item) => {
          return {
            ...OrderItemLocally.toDto(item),
            product: ProductOrderDto.toDto(item.product),
          };
        }),
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
