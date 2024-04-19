import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IDbListCategoryRepository } from '@/core/domain/protocols/db/category/list-category-respository';
import { CategoryModelDto } from '@/presentation/dtos/category/category-model.dto';
import { IDbDeleteCategoryRepository } from '@/core/domain/protocols/db/category/delete-category-repository';
import { IDbUpdateCategoryRepository } from '@/core/domain/protocols/db/category/update-category-repository';
import { Category } from '@/core/domain/models/category.entity';
import { AddCategoryDto } from '@/presentation/dtos/category/add-category.dto';

@ApiTags('Category')
@Controller('api/v1/category')
export class CategoryController {
  constructor(
    private readonly dbListCategory: IDbListCategoryRepository,
    private readonly dbUpdateCategory: IDbUpdateCategoryRepository,
    private readonly dbDeleteCategory: IDbDeleteCategoryRepository,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Returns Categorys.',
    status: HttpStatus.OK,
    type: CategoryModelDto,
    isArray: true,
  })
  @ApiBearerAuth()
  async getAll(): Promise<CategoryModelDto[]> {
    try {
      return await this.dbListCategory.getAll();
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Put(':id')
  @ApiBody({
    type: AddCategoryDto,
  })
  @ApiOkResponse({
    description: 'Delete success.',
    status: HttpStatus.OK,
    type: CategoryModelDto,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() payload: Omit<CategoryModelDto, 'id'>,
  ): Promise<Category> {
    try {
      return await this.dbUpdateCategory.update(payload, id);
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
      return await this.dbDeleteCategory.delete(id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
