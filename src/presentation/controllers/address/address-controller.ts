import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IDbAddAddressRepository } from '@/core/domain/protocols/db/address/add-address-repository';
import { IDbListAddressRepository } from '@/core/domain/protocols/db/address/list-address-respository';
import { AddressModelDto } from '@/presentation/dtos/address/address-model.dto';
import { IDbDeleteAddressRepository } from '@/core/domain/protocols/db/address/delete-address-repository';
import { IDbUpdateAddressRepository } from '@/core/domain/protocols/db/address/update-address-repository';
import { Address } from '@/core/domain/models/address.entity';
import { AddAddressDto } from '@/presentation/dtos/address/add-address.dto';

@ApiTags('Address')
@Controller('api/v1/address')
export class AddressController {
  constructor(
    private readonly dbAddAddress: IDbAddAddressRepository,
    private readonly dbListAddress: IDbListAddressRepository,
    private readonly dbUpdateAddress: IDbUpdateAddressRepository,
    private readonly dbDeleteAddress: IDbDeleteAddressRepository,
  ) {}

  @ApiBody({
    description: 'Create Address',
    type: AddAddressDto,
  })
  @ApiCreatedResponse({ type: AddressModelDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  async create(
    @Body() payload: Omit<AddressModelDto, 'id'>,
  ): Promise<AddressModelDto> {
    return await this.dbAddAddress.create(payload);
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns Addresss.',
    status: HttpStatus.OK,
    type: AddressModelDto,
    isArray: true,
  })
  @ApiBearerAuth()
  async getAll(): Promise<AddressModelDto[]> {
    try {
      return await this.dbListAddress.getAll();
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Put(':id')
  @ApiBody({
    type: AddAddressDto,
  })
  @ApiOkResponse({
    description: 'Delete success.',
    status: HttpStatus.OK,
    type: AddressModelDto,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() payload: Omit<AddressModelDto, 'id'>,
  ): Promise<Address> {
    try {
      return await this.dbUpdateAddress.update(payload, id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete success.',
    status: HttpStatus.OK,
  })
  @ApiBearerAuth()
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return await this.dbDeleteAddress.delete(id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
