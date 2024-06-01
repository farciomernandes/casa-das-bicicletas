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
import { OrderModelDto } from '@/presentation/dtos/order/order-model.dto';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { ProductVariablesRepository } from '@/core/domain/protocols/repositories/product_variable';
import { DataSource, EntityManager } from 'typeorm';
import { OrderItemRepository } from '@/core/domain/protocols/repositories/order_item';

@Injectable()
export class DbAddOrder implements IDbAddOrderRepository {
  private readonly logger = new Logger(DbAddOrder.name);

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
    private readonly orderItemRepository: OrderItemRepository,
    private readonly productRepository: ProductRepository,
    private readonly productVariablesRepository: ProductVariablesRepository,
    private dataSource: DataSource,
  ) {}

  async create(payload: AddOrderDto, userId: string): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.getUser(userId);
      const order = await this.createOrder(user, queryRunner.manager);

      const orderItems = await this.createOrderItems(
        payload.order_items,
        order.id,
        queryRunner.manager,
      );

      const total = this.calculateTotal(orderItems);

      await this.updateOrderTotal(order.id, total, queryRunner.manager);
      order.order_items = orderItems;
      order.total = total;
      order.user = user;

      await queryRunner.commitTransaction();

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

  private async createOrder(user: any, entityManager: EntityManager) {
    try {
      const order = await this.orderRepository.createTransactionMode(
        { total: 0, status: null, order_items: [] },
        user.id,
        entityManager,
      );

      return order;
    } catch (error) {
      return error;
    }
  }

  private async createOrderItems(
    orderItemsPayload: any[],
    orderId: string,
    entityManager: EntityManager,
  ) {
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
        entityManager,
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
      total += Number(item.sub_total);
    }
    return Number(total);
  }

  private async createDbOrderItem(
    orderId: string,
    productVariableId: string,
    quantity: number,
    subTotal: number,
    entityManager: EntityManager,
  ) {
    await this.orderItemRepository.createTransactionMode(
      {
        order_id: orderId,
        product_variables_id: productVariableId,
        quantity: quantity,
        sub_total: subTotal,
      },
      entityManager,
    );
  }

  private async updateOrderTotal(
    orderId: string,
    total: number,
    entityManager: EntityManager,
  ): Promise<void> {
    await this.orderRepository.updateTransactionMode(
      { total, status: null },
      orderId,
      entityManager,
    );
  }

  private handleException(error: Error) {
    this.logger.error(error.message);
    if (error instanceof BadRequestException) {
      throw error;
    }
    throw new InternalServerErrorException(error.message);
  }
}
