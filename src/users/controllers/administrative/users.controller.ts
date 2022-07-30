import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/shared/decorators/paginatedResponse.decorator';
import { ApiSuccessResponse } from 'src/shared/decorators/successResponse.decorator';
import { Administrative } from 'src/shared/middlewares/administrative/administrative.decorator';
import { Permissions } from 'src/shared/middlewares/administrative/permissions.enum';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { ListUserQueryDTO } from 'src/users/dto/list-user.dto';
import { PublicUserDTO } from 'src/users/dto/public-user.dto';
import { UpdateUserDTO } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('administrative/users')
@ApiTags('Administrative')
@ApiBearerAuth('accessToken')
export class AdministrativeUsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  @Administrative(Permissions.USER_LIST)
  @ApiPaginatedResponse(PublicUserDTO)
  @ApiOperation({ summary: 'List all users paginated' })
  list(@Query() query: ListUserQueryDTO) {
    const { page, totalPerPage } = query;

    const take = Number(totalPerPage ?? 10);
    const skip = take * (page && page - 1 > 0 ? Number(page - 1) : 0);

    return this.usersService.list(skip, take);
  }

  @Post('create')
  @Administrative(Permissions.USER_CREATE)
  @ApiCreatedResponse({ type: PublicUserDTO })
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @Administrative(Permissions.USER_VIEW)
  @ApiOkResponse({ type: PublicUserDTO })
  @ApiOperation({ summary: 'Get an user' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Administrative(Permissions.USER_UPDATE)
  @ApiOkResponse({ type: PublicUserDTO })
  @ApiOperation({ summary: 'Update an user' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Administrative(Permissions.USER_DELETE)
  @ApiOperation({ summary: 'Delete an user' })
  @ApiSuccessResponse()
  async remove(@Param('id') id: string) {
    const success = await this.usersService.destroy(id);
    return Boolean({ success });
  }
}
