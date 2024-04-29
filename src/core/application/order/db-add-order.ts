import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IDbAddOrderRepository } from '@/core/domain/protocols/db/order/add-order-repository';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';
import { IDbAddOrderItemRepository } from '@/core/domain/protocols/db/order_item/add-order_item-repository';
import {
  CategoryLocallylDto,
  OrderItemLocally,
  OrderModel,
  ProductOrderDto,
  UserOrderDto,
} from '@/presentation/dtos/order/order-model.dto';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { OrderStatusEnum } from '@/shared/enums/order_status.enum';
import { ProductVariablesRepository } from '@/core/domain/protocols/repositories/product_variable';

@Injectable()
export class DbAddOrder implements IDbAddOrderRepository {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
    private readonly dbAddOrderItem: IDbAddOrderItemRepository,
    private readonly productRepository: ProductRepository,
    private readonly productVariablesRepository: ProductVariablesRepository,
  ) {}

  async create(payload: AddOrderDto): Promise<OrderModel> {
    try {
      const validUser = await this.userRepository.findById(payload.user_id);
      if (!validUser) {
        throw new BadRequestException(
          `User with ${payload.user_id} id not found`,
        );
      }

      const order = await this.orderRepository.create({
        total: 0,
        user_id: payload.user_id,
        status: OrderStatusEnum.PENDING,
        order_items: [],
      });

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
        const productId = product_variable.product_id;

        const product = await this.productRepository.findById(productId);
        if (!product) {
          throw new BadRequestException(
            `Product with ${productId} id not found`,
          );
        }

        const sub_total = item.quantity * product.price;

        order_items.push({
          id: productId,
          quantity: item.quantity,
          sub_total,
          product: product,
        });

        total += sub_total;

        await this.dbAddOrderItem.create({
          order_id: order.id,
          product_id: productId,
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
        order_items: order.order_items.map((item) => {
          return {
            ...OrderItemLocally.toDto(item),
            product: {
              ...ProductOrderDto.toDto(item.product),
              category: {
                ...CategoryLocallylDto.toDto(item.product.category),
              },
            },
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
