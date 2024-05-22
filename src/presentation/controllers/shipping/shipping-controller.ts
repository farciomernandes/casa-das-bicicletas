import { IShippingCalculateSent } from '@/core/domain/protocols/shipping/shipping-calculate-sent';
import { ShippingOptionDto } from '@/presentation/dtos/shipping/shipping-calculate.dto';
import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Shipping')
@Controller('api/v1/shipping')
export class ShippingController {
  constructor(private readonly shippingCalculateSent: IShippingCalculateSent) {}

  @Get()
  @ApiOkResponse({
    description: 'Returns Users.',
    status: HttpStatus.OK,
    type: ShippingOptionDto,
    isArray: true,
  })
  async calculateShipping(
    @Query('originZipCode') originZipCode: string,
    @Query('destinationZipCode') destinationZipCode: string,
    @Query('weight') weight: number,
    @Query('length') length: number,
    @Query('height') height: number,
    @Query('width') width: number,
  ) {
    try {
      const result = await this.shippingCalculateSent.calculateShipping(
        originZipCode,
        destinationZipCode,
        weight,
        length,
        height,
        width,
      );
      return result;
    } catch (error) {
      throw new HttpException(
        'Error calculating shipping',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
