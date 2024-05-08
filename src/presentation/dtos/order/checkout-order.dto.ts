import { ApiProperty } from '@nestjs/swagger';
import { OrderModel } from './order-model.dto';
import { PaymentDto } from '../asaas/payment-base.dto';
import { PixTransactionDto } from '../asaas/payment-pix.dto';
import { BoletoTransactionDto } from '../asaas/payment-boleto.dto';
import { plainToClass } from 'class-transformer';

export class CheckoutOrderModelDto {
  @ApiProperty()
  order: OrderModel;

  @ApiProperty({
    example: PaymentDto,
    type: PaymentDto,
  })
  transaction: PixTransactionDto | BoletoTransactionDto | PaymentDto;

  static toDto(payload: CheckoutOrderModelDto): CheckoutOrderModelDto {
    return plainToClass(CheckoutOrderModelDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
