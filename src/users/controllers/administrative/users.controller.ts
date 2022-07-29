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
  @ApiCreatedResponse({ type: PublicUserDTO, isArray: true })
  @ApiOperation({ summary: 'List all users paginated' })
  list(@Query() query: ListUserQueryDTO) {
    const { page, totalPerPage } = query;

    const take = Number(totalPerPage ?? 10);
    const skip = take * (page && page - 1 > 0 ? Number(page - 1) : 0);

    return this.usersService.list(skip, take);
  }

  @Post('create')
  @ApiCreatedResponse({ type: PublicUserDTO })
  create(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @ApiCreatedResponse({ type: PublicUserDTO })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: PublicUserDTO })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
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
    const success = await this.usersService.destroy(id);
    return Boolean({ success });
  }
}
