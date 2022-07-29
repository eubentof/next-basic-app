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
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiCreatedResponse({ type: PublicUserDTO, isArray: true })
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
  @ApiCreatedResponse({ type: PublicUserDTO })
  @ApiOperation({ summary: 'Gets a specific user' })
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Administrative(Permissions.USER_UPDATE)
  @ApiCreatedResponse({ type: PublicUserDTO })
  @ApiOperation({ summary: 'Updates a specific user' })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDTO) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Administrative(Permissions.USER_DELETE)
  @ApiOperation({ summary: 'Deletes a specific user' })
  @ApiCreatedResponse({
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
    const success = await this.usersService.destroy(+id);
    return Boolean({ success });
  }
}
