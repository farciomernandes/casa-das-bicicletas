import { RolesGuard } from '@/infra/guards/roles.guard';
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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IDbAddRoleRepository } from '@/core/domain/protocols/db/role/add-role-repository';
import { IDbListRoleRepository } from '@/core/domain/protocols/db/role/list-role-respository';
import { AddRole } from '@/presentation/dtos/role/add-role.dto';
import { RoleModel } from '@/presentation/dtos/role/role-model.dto';
import { IDbDeleteRoleRepository } from '@/core/domain/protocols/db/role/delete-role-repository';

@ApiTags('Role')
@Controller('api/v1/role')
export class RoleController {
  constructor(
    private readonly dbAddRole: IDbAddRoleRepository,
    private readonly dbListRole: IDbListRoleRepository,
    private readonly dbDeleteRole: IDbDeleteRoleRepository,
  ) {}

  @ApiBody({
    description: 'Create Role',
    type: AddRole,
  })
  @ApiCreatedResponse({ type: RoleModel })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  async create(@Body() payload: Omit<RoleModel, 'id'>): Promise<RoleModel> {
    return await this.dbAddRole.create(payload);
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns Roles.',
    status: HttpStatus.OK,
    type: RoleModel,
    isArray: true,
  })
  @ApiBearerAuth()
  async getAll(): Promise<RoleModel[]> {
    try {
      return await this.dbListRole.getAll();
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
      return await this.dbDeleteRole.delete(id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
