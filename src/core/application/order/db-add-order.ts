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
import { OrderModelDto } from '@/presentation/dtos/order/order-model.dto';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { ProductVariablesRepository } from '@/core/domain/protocols/repositories/product_variable';

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

  async create(payload: AddOrderDto, userId: string): Promise<OrderModelDto> {
    try {
      const user = await this.getUser(userId);
      const order = await this.createOrder(user);
      const orderItems = await this.createOrderItems(
        payload.order_items,
        order.id,
      );
      const total = this.calculateTotal(orderItems);
      await this.updateOrderTotal(order.id, total);
      order.order_items = orderItems;
      order.total = total;
      return OrderModelDto.toDto(order);
    } catch (error) {
      this.handleException(error);
    }
  }

  private async getUser(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new BadRequestException(`User with ${userId} id not found`);
    }
    return user;
  }

  private async createOrder(user: any) {
    try {
      const order = await this.orderRepository.create(
        { total: 0, status: null, order_items: [] },
        user.id,
      );
      return order;
    } catch (error) {
      return error;
    }
  }

  private async createOrderItems(orderItemsPayload: any[], orderId: string) {
    const orderItems: any[] = [];
    for (const item of orderItemsPayload) {
      const productVariable = await this.getProductVariable(
        item.product_variables_id,
      );

      this.validateQuantity(
        item.quantity,
        productVariable.quantity,
        productVariable.id,
      );
      const product = await this.getProduct(productVariable.product.id);
      const subTotal = this.calculateSubtotal(
        item.quantity,
        productVariable.price,
        productVariable.discount_percent,
      );
      orderItems.push({
        id: productVariable.id,
        quantity: item.quantity,
        sub_total: subTotal,
        product: product,
      });
      await this.createDbOrderItem(
        orderId,
        productVariable.id,
        item.quantity,
        subTotal,
      );
    }
    return orderItems;
  }

  private async getProductVariable(productVariableId: string) {
    const productVariable = await this.productVariablesRepository.findById(
      productVariableId,
    );

    if (!productVariable) {
      throw new BadRequestException(
        `Product for variable_id ${productVariableId} not found`,
      );
    }
    return productVariable;
  }

  private validateQuantity(
    quantity: number,
    availableQuantity: number,
    productVariableId: string,
  ) {
    if (quantity > availableQuantity) {
      throw new BadRequestException(
        `Quantity of ${quantity} exceeds available quantity (${availableQuantity}) for product variable ${productVariableId}`,
      );
    }
  }

  private async getProduct(productId: string) {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new BadRequestException(`Product with ${productId} id not found`);
    }
    return product;
  }

  private calculateSubtotal(
    quantity: number,
    price: number,
    discountPercent: number,
  ) {
    let subTotal = quantity * price;
    if (discountPercent) {
      const discountAmount = (subTotal * discountPercent) / 100;
      subTotal -= discountAmount;
    }
    return subTotal;
  }

  private calculateTotal(orderItems: any[]) {
    let total = 0;
    for (const item of orderItems) {
      total += item.sub_total;
    }
    return total;
  }

  private async createDbOrderItem(
    orderId: string,
    productVariableId: string,
    quantity: number,
    subTotal: number,
  ) {
    await this.dbAddOrderItem.create({
      order_id: orderId,
      product_variables_id: productVariableId,
      quantity: quantity,
      sub_total: subTotal,
    });
  }

  private async updateOrderTotal(
    orderId: string,
    total: number,
  ): Promise<void> {
    await this.orderRepository.update({ total, status: null }, orderId);
  }

  private handleException(error: Error) {
    this.logger.error(error.message);
    if (error instanceof BadRequestException) {
      throw error;
    }
    throw new InternalServerErrorException(error.message);
  }
}
