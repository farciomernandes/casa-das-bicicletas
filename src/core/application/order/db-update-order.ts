import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbUpdateOrderRepository } from '@/core/domain/protocols/db/order/update-order-repository';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { UpdateOrderDto } from '@/presentation/dtos/order/update-order.dto';
import { ProductVariablesRepository } from '@/core/domain/protocols/repositories/product_variable';
import { OrderStatusEnum } from '@/shared/enums/order_status.enum';
import { OrderModelDto } from '@/presentation/dtos/order/order-model.dto';

@Injectable()
export class DbUpdateOrder implements IDbUpdateOrderRepository {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productVariablesRepository: ProductVariablesRepository,
  ) {}

  async update(payload: UpdateOrderDto, id: string): Promise<OrderModelDto> {
    try {
      const old_order = await this.orderRepository.findById(id);
      const order = await this.orderRepository.update(payload, id);

      if (payload.status === 'PAID' && payload.transaction_id) {
        for (const item of order.order_items) {
          const productVariables =
            await this.productVariablesRepository.findById(
              item.product_variables_id,
            );

          const updatedQuantity = productVariables.quantity - item.quantity;

          if (updatedQuantity < 0) {
            await this.orderRepository.update(
              {
                ...old_order,
                status: OrderStatusEnum.PAID_ERROR_STOCK,
              },
              id,
            );

            throw new BadRequestException(
              `No have quantity disponible this product variable with ${item.product_variables_id} id`,
            );
          }

          await this.productVariablesRepository.update(
            { ...productVariables, quantity: updatedQuantity },
            productVariables.id,
          );
        }
      }

      return OrderModelDto.toDto(order);
    } catch (error) {
      throw error;
    }
  }
}
