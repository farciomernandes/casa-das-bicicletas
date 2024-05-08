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
import { IDbAddStateRepository } from '@/core/domain/protocols/db/state/add-state-repository';
import { IDbListStateRepository } from '@/core/domain/protocols/db/state/list-state-respository';
import { StateModel } from '@/presentation/dtos/state/state-model.dto';
import { IDbDeleteStateRepository } from '@/core/domain/protocols/db/state/delete-state-repository';
import { IDbUpdateStateRepository } from '@/core/domain/protocols/db/state/update-state-repository';
import { State } from '@/core/domain/models/state.entity';
import { AddStateDto } from '@/presentation/dtos/state/add-state.dto';

@ApiTags('State')
@Controller('api/v1/state')
export class StateController {
  constructor(
    private readonly dbAddState: IDbAddStateRepository,
    private readonly dbListState: IDbListStateRepository,
    private readonly dbUpdateState: IDbUpdateStateRepository,
    private readonly dbDeleteState: IDbDeleteStateRepository,
  ) {}

  @ApiBody({
    description: 'Create State',
    type: AddStateDto,
  })
  @ApiCreatedResponse({ type: StateModel })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  async create(@Body() payload: Omit<State, 'id'>): Promise<State> {
    return await this.dbAddState.create(payload);
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns States.',
    status: HttpStatus.OK,
    type: StateModel,
    isArray: true,
  })
  @ApiBearerAuth()
  async getAll(): Promise<State[]> {
    try {
      return await this.dbListState.getAll();
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Put(':id')
  @ApiBody({
    type: AddStateDto,
  })
  @ApiOkResponse({
    description: 'Delete success.',
    status: HttpStatus.OK,
    type: StateModel,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() payload: Omit<State, 'id'>,
  ): Promise<State> {
    try {
      return await this.dbUpdateState.update(payload, id);
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
      return await this.dbDeleteState.delete(id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
