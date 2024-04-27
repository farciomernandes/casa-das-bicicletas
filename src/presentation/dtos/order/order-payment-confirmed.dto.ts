import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { PaymentDto } from '../asaas/payment-base.dto';
export class PaymentConfirmedDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  event: string;

  @ApiProperty({
    example: PaymentDto,
    type: PaymentDto,
  })
  payment: PaymentDto;

  static toDto(payload: PaymentConfirmedDto): PaymentConfirmedDto {
    return plainToClass(PaymentConfirmedDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
