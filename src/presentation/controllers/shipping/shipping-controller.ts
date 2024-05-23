import { Shipping } from '@/core/domain/models/shipping.entity';
import { IDbAddShippingRepository } from '@/core/domain/protocols/db/shipping/add-shipping-repository';
import { IDbDeleteShippingRepository } from '@/core/domain/protocols/db/shipping/delete-shipping-repository';
import { IDbListShippingRepository } from '@/core/domain/protocols/db/shipping/list-shipping-respository';
import { IDbUpdateShippingRepository } from '@/core/domain/protocols/db/shipping/update-shipping-repository';
import { IShippingCalculate } from '@/core/domain/protocols/shipping/IShippingCalculate';
import { RolesGuard } from '@/infra/guards/roles.guard';
import { AddShippingDto } from '@/presentation/dtos/shipping/add-shipping.dto';
import { ShippingOptionDto } from '@/presentation/dtos/shipping/shipping-calculate.dto';
import { ShippingModelDto } from '@/presentation/dtos/shipping/shipping-model.dto';
import { UpdateShippingDto } from '@/presentation/dtos/shipping/update-shipping.dto';
import { Roles } from '@/shared/decorators/roles.decorator';
import { RolesEnum } from '@/shared/enums/roles.enum';
import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Shipping')
@Controller('api/v1/shippings')
export class ShippingController {
  constructor(
    private readonly shippingCalculate: IShippingCalculate,
    private readonly dbListShipping: IDbListShippingRepository,
    private readonly dbAddShipping: IDbAddShippingRepository,
    private readonly dbUpdateShipping: IDbUpdateShippingRepository,
    private readonly dbDeleteShipping: IDbDeleteShippingRepository,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Returns Shippings.',
    status: HttpStatus.OK,
    type: ShippingModelDto,
    isArray: true,
  })
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  async getAll(): Promise<ShippingModelDto[]> {
    try {
      return await this.dbListShipping.getAll();
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Post()
  @ApiBody({
    type: AddShippingDto,
  })
  @ApiOkResponse({
    description: 'Returns Shippings.',
    status: HttpStatus.OK,
    type: ShippingModelDto,
  })
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  async create(@Body() payload: AddShippingDto): Promise<ShippingModelDto> {
    try {
      return await this.dbAddShipping.create(payload);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Put(':id')
  @ApiBody({
    type: UpdateShippingDto,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: ShippingModelDto,
  })
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateShippingDto,
  ): Promise<Shipping> {
    try {
      return await this.dbUpdateShipping.update(payload, id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete success.',
    status: HttpStatus.OK,
  })
  @Roles(RolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return await this.dbDeleteShipping.delete(id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Get('calculate/:order_id')
  @ApiOkResponse({
    description: 'Returns Users.',
    status: HttpStatus.OK,
    type: ShippingOptionDto,
    isArray: true,
  })
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  async calculateShipping(
    @Param('order_id') order_id: string,
    @Query('to_postal_code') to_postal_code: string,
  ) {
    try {
      const result = await this.shippingCalculate.calculateShipping(
        order_id,
        to_postal_code,
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
