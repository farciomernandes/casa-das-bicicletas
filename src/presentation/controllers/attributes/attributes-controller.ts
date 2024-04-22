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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IDbAddAttributesRepository } from '@/core/domain/protocols/db/attributes/add-attributes-repository';
import { IDbListAttributesRepository } from '@/core/domain/protocols/db/attributes/list-attributes-respository';
import { AttributesModel } from '@/presentation/dtos/attributes/attributes-model.dto';
import { IDbDeleteAttributesRepository } from '@/core/domain/protocols/db/attributes/delete-attributes-repository';
import { IDbUpdateAttributesRepository } from '@/core/domain/protocols/db/attributes/update-attributes-repository';
import { Attributes } from '@/core/domain/models/attributes.entity';
import { AddAttributesModel } from '@/presentation/dtos/attributes/add-attributes.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from '@/infra/config/multer';

@ApiTags('Attributes')
@Controller('api/v1/attributes')
export class AttributesController {
  constructor(
    private readonly dbAddAttributes: IDbAddAttributesRepository,
    private readonly dbListAttributes: IDbListAttributesRepository,
    private readonly dbUpdateAttributes: IDbUpdateAttributesRepository,
    private readonly dbDeleteAttributes: IDbDeleteAttributesRepository,
  ) {}

  @ApiBody({
    description: 'Create Attributes',
    type: AddAttributesModel,
  })
  @ApiCreatedResponse({ type: AddAttributesModel })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image_link', multerConfig))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  async create(
    @UploadedFile() image_link: Express.Multer.File,
    @Body() payload: Omit<AddAttributesModel, 'image_link'>,
  ): Promise<Attributes> {
    return await this.dbAddAttributes.create(payload, image_link);
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns Attributess.',
    status: HttpStatus.OK,
    type: AttributesModel,
    isArray: true,
  })
  @ApiBearerAuth()
  async getAll(): Promise<Attributes[]> {
    try {
      return await this.dbListAttributes.getAll();
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Put(':id')
  @ApiBody({
    type: AddAttributesModel,
  })
  @ApiOkResponse({
    description: 'Delete success.',
    status: HttpStatus.OK,
    type: AttributesModel,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() payload: Omit<AddAttributesModel, 'id'>,
  ): Promise<Attributes> {
    try {
      return await this.dbUpdateAttributes.update(payload, id);
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
      return await this.dbDeleteAttributes.delete(id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
