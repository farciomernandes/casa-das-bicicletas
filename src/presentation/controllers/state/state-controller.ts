import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IDbListStateRepository } from '@/core/domain/protocols/db/state/list-state-respository';
import { StateModel } from '@/presentation/dtos/state/state-model.dto';
import { State } from '@/core/domain/models/state.entity';

@ApiTags('State')
@Controller('api/v1/states')
export class StateController {
  constructor(private readonly dbListState: IDbListStateRepository) {}

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
}
