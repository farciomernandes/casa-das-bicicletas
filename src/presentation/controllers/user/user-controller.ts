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
import { IDbAddUserRepository } from '@/core/domain/protocols/db/user/add-user-repository';
import { IDbListUserRepository } from '@/core/domain/protocols/db/user/list-user-respository';
import {
  CreateUserDto,
  GetAllUsersDto,
  UserModelDto,
} from '@/presentation/dtos/user/user-model.dto';
import { IDbDeleteUserRepository } from '@/core/domain/protocols/db/user/delete-user-repository';
import { IDbUpdateUserRepository } from '@/core/domain/protocols/db/user/update-user-repository';
import { AddUserDto } from '@/presentation/dtos/user/add-user.dto';
import { UpdateUserDto } from '@/presentation/dtos/user/update-user.dto';

@ApiTags('User')
@Controller('api/v1/users')
export class UserController {
  constructor(
    private readonly dbAddUser: IDbAddUserRepository,
    private readonly dbListUser: IDbListUserRepository,
    private readonly dbUpdateUser: IDbUpdateUserRepository,
    private readonly dbDeleteUser: IDbDeleteUserRepository,
  ) {}

  @ApiBody({
    description: 'Create User',
    type: AddUserDto,
  })
  @ApiCreatedResponse({ type: CreateUserDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  async create(@Body() payload: AddUserDto): Promise<CreateUserDto> {
    return await this.dbAddUser.create(payload);
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns Users.',
    status: HttpStatus.OK,
    type: GetAllUsersDto,
    isArray: true,
  })
  @ApiBearerAuth()
  async getAll(): Promise<{ users: UserModelDto[]; total: number }> {
    try {
      return await this.dbListUser.getAll();
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Put(':id')
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiOkResponse({
    description: 'Delete success.',
    status: HttpStatus.OK,
    type: UserModelDto,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<UserModelDto> {
    try {
      return await this.dbUpdateUser.update(payload, id);
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
      return await this.dbDeleteUser.delete(id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
