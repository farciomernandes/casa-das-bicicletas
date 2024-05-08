import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IDbAddOrderRepository } from '@/core/domain/protocols/db/order/add-order-repository';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';
import { IDbAddOrderItemRepository } from '@/core/domain/protocols/db/order_item/add-order_item-repository';
import {
  OrderItemLocally,
  OrderModel,
  UserOrderDto,
} from '@/presentation/dtos/order/order-model.dto';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { OrderStatusEnum } from '@/shared/enums/order_status.enum';
import { ProductVariablesRepository } from '@/core/domain/protocols/repositories/product_variable';
import { ProductVariablesModel } from '@/presentation/dtos/product_variable/product_variables-model.dto';

@Injectable()
export class DbAddOrder implements IDbAddOrderRepository {
  private readonly logger = new Logger(DbAddOrder.name);

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
    private readonly dbAddOrderItem: IDbAddOrderItemRepository,
    private readonly productRepository: ProductRepository,
    private readonly productVariablesRepository: ProductVariablesRepository,
  ) {}

  async create(payload: AddOrderDto, user_id: string): Promise<OrderModel> {
    try {
      const validUser = await this.userRepository.findById(user_id);
      if (!validUser) {
        throw new BadRequestException(`User with ${user_id} id not found`);
      }

      const order = await this.orderRepository.create(
        {
          total: 0,
          status: OrderStatusEnum.PENDING,
          order_items: [],
        },
        user_id,
      );

      let total = 0;

      const order_items: any[] = [];

      for (const item of payload.order_items) {
        const product_variable = await this.productVariablesRepository.findById(
          item.product_variables_id,
        );

        if (!product_variable) {
          throw new BadRequestException(
            `Product for variable_id ${item.product_variables_id} not found`,
          );
        }

        if (item.quantity > product_variable.quantity) {
          throw new BadRequestException(
            `Quantity of ${item.quantity} exceeds available quantity (${product_variable.quantity}) for product variable ${item.product_variables_id}`,
          );
        }

        const productId = product_variable.product.id;

        const product = await this.productRepository.findById(productId);

        if (!product) {
          throw new BadRequestException(
            `Product with ${productId} id not found`,
          );
        }

        const sub_total = item.quantity * product_variable.price;

        order_items.push({
          id: product_variable.id,
          quantity: item.quantity,
          sub_total,
          product: product,
        });

        total += sub_total;

        await this.dbAddOrderItem.create({
          order_id: order.id,
          product_variables_id: product_variable.id,
          quantity: item.quantity,
          sub_total: sub_total,
        });
      }

      order.order_items = order_items;

      const response = await this.orderRepository.update(
        {
          status: order.status,
          total,
        },
        order.id,
      );
      const updatedOrder = OrderModel.toDto(response);

      return {
        ...updatedOrder,
        user: UserOrderDto.toDto(validUser),
        order_items: order_items.map((item) => {
          return {
            ...OrderItemLocally.toDto(item),
            product_variables: {
              ...ProductVariablesModel.toDto(item.product.product_variables[0]),
            },
          };
        }),
      };
    } catch (error) {
      this.logger.error(error.message);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
