import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderRepository } from '@/core/domain/protocols/repositories/order';
import { OrderModelDto } from '@/presentation/dtos/order/order-model.dto';
import { IDbFindOrderByIdRepository } from '@/core/domain/protocols/db/order/find-order-by-id-repository';
@Injectable()
export class DbFindOrderById implements IDbFindOrderByIdRepository {
  constructor(private readonly orderRepository: OrderRepository) {}
  async findById(id: string): Promise<OrderModelDto> {
    try {
      const order = await this.orderRepository.findById(id);
      if (order == null) {
        throw new BadRequestException(`Order with ${id} id not found!`);
      }

      return OrderModelDto.toDto(order);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
