import { ApiProperty } from '@nestjs/swagger';
import { PaymentDto } from '../asaas/payment-base.dto';
import { PixTransactionDto } from '../asaas/payment-pix.dto';
import { BoletoTransactionDto } from '../asaas/payment-boleto.dto';
import { plainToClass } from 'class-transformer';
import { OrderModelDto } from './order-model.dto';

export class CheckoutOrderModelDto {
  @ApiProperty()
  order: OrderModelDto;

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
