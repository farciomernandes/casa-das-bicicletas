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
import { UploadAddressDto } from '@/presentation/dtos/address/upload-address.dto';
import { User } from '@/shared/decorators/user.decorator';
import { Authenticated } from '@/presentation/dtos/auth/authenticated.dto';
import { IDbListByUserAddressRepository } from '@/core/domain/protocols/db/address/list-by-user-address-respository';

@ApiTags('Address')
@Controller('api/v1/addresses')
export class AddressController {
  constructor(
    private readonly dbAddAddress: IDbAddAddressRepository,
    private readonly dbListAddress: IDbListAddressRepository,
    private readonly dbListByUserAddress: IDbListByUserAddressRepository,
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
    @User() user: Authenticated,
    @Body() payload: Omit<AddAddressDto, 'id'>,
  ): Promise<AddressModelDto> {
    return await this.dbAddAddress.create(payload, user.id);
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

  @Get('byuser/:user_id')
  @ApiOkResponse({
    description: 'Returns Addresss.',
    status: HttpStatus.OK,
    type: AddressModelDto,
    isArray: true,
  })
  @ApiBearerAuth()
  async getByUser(
    @Param('user_id') user_id: string,
  ): Promise<AddressModelDto[]> {
    try {
      return await this.dbListByUserAddress.getByUser(user_id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Put(':id')
  @ApiBody({
    type: UploadAddressDto,
  })
  @ApiOkResponse({
    description: 'Delete success.',
    status: HttpStatus.OK,
    type: AddressModelDto,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() payload: UploadAddressDto,
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
