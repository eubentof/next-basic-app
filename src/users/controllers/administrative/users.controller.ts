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
import { Tags } from 'src/shared/enums/api-tags.enum';
import { Administrative } from 'src/shared/middlewares/administrative/administrative.decorator';
import { Permissions } from 'src/shared/middlewares/administrative/permissions.enum';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { ListUserQueryDTO } from 'src/users/dto/list-user.dto';
import { PublicUserDTO } from 'src/users/dto/public-user.dto';
import { UpdateUserDTO } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';
import { ApiPaginatedResponse } from 'src/utils/methods/paginationDecorator';

@Controller('administrative/users')
@ApiTags(Tags.ADMINISTRATIVE)
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
  @ApiOperation({ summary: 'Creates a new user' })
  create(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @Administrative(Permissions.USER_VIEW)
  @ApiOkResponse({ type: PublicUserDTO })
  @ApiOperation({ summary: 'Gets a specific user' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Administrative(Permissions.USER_UPDATE)
  @ApiOkResponse({ type: PublicUserDTO })
  @ApiOperation({ summary: 'Updates a specific user' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Administrative(Permissions.USER_DELETE)
  @ApiOperation({ summary: 'Deletes a specific user' })
  @ApiOkResponse({
    type: Object,
    schema: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          default: true,
        },
      },
    },
  })
  async remove(@Param('id') id: string) {
    const success = await this.usersService.destroy(id);
    return Boolean({ success });
  }
}
