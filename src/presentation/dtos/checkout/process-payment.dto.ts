import { IsNotEmpty, IsString } from 'class-validator';

export class PaymentDataDto {
  @IsNotEmpty()
  @IsString()
  creditCardNumber: string;

  @IsNotEmpty()
  @IsString()
  creditCardHolder: string;

  @IsNotEmpty()
  @IsString()
  creditCardExpiration: string;

  @IsNotEmpty()
  @IsString()
  creditCardSecurityCode: string;
}
