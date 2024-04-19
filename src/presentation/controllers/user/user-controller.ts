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
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';
import { IDbDeleteUserRepository } from '@/core/domain/protocols/db/user/delete-user-repository';
import { IDbUpdateUserRepository } from '@/core/domain/protocols/db/user/update-user-repository';
import { User } from '@/core/domain/models/user.entity';
import { AddUserDto } from '@/presentation/dtos/user/add-user.dto';

@ApiTags('User')
@Controller('api/v1/user')
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
  @ApiCreatedResponse({ type: UserModelDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  async create(
    @Body() payload: Omit<UserModelDto, 'id'>,
  ): Promise<UserModelDto> {
    return await this.dbAddUser.create(payload);
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns Users.',
    status: HttpStatus.OK,
    type: UserModelDto,
    isArray: true,
  })
  @ApiBearerAuth()
  async getAll(): Promise<UserModelDto[]> {
    try {
      return await this.dbListUser.getAll();
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Put(':id')
  @ApiBody({
    type: AddUserDto,
  })
  @ApiOkResponse({
    description: 'Delete success.',
    status: HttpStatus.OK,
    type: UserModelDto,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() payload: Omit<UserModelDto, 'id'>,
  ): Promise<User> {
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
