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
import { IDbAddCityRepository } from '@/core/domain/protocols/db/city/add-city-repository';
import { IDbListCityRepository } from '@/core/domain/protocols/db/city/list-city-respository';
import { CityModel } from '@/presentation/dtos/city/city-model.dto';
import { IDbDeleteCityRepository } from '@/core/domain/protocols/db/city/delete-city-repository';
import { IDbUpdateCityRepository } from '@/core/domain/protocols/db/city/update-city-repository';
import { City } from '@/core/domain/models/city.entity';
import { AddCityDto } from '@/presentation/dtos/city/add-city.dto';
import { UpdateCityDto } from '@/presentation/dtos/city/update-city.dto';

@ApiTags('City')
@Controller('api/v1/city')
export class CityController {
  constructor(
    private readonly dbAddCity: IDbAddCityRepository,
    private readonly dbListCity: IDbListCityRepository,
    private readonly dbUpdateCity: IDbUpdateCityRepository,
    private readonly dbDeleteCity: IDbDeleteCityRepository,
  ) {}

  @ApiBody({
    description: 'Create City',
    type: AddCityDto,
  })
  @ApiCreatedResponse({ type: CityModel })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  async create(@Body() payload: Omit<CityModel, 'id'>): Promise<CityModel> {
    return await this.dbAddCity.create(payload);
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns Citys.',
    status: HttpStatus.OK,
    type: CityModel,
    isArray: true,
  })
  @ApiBearerAuth()
  async getAll(): Promise<CityModel[]> {
    try {
      return await this.dbListCity.getAll();
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Put(':id')
  @ApiBody({
    type: UpdateCityDto,
  })
  @ApiOkResponse({
    description: 'Delete success.',
    status: HttpStatus.OK,
    type: CityModel,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateCityDto,
  ): Promise<City> {
    try {
      return await this.dbUpdateCity.update(payload, id);
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
      return await this.dbDeleteCity.delete(id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
