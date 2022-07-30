import { Controller, Get, Body, Patch, Delete, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiSuccessResponse } from 'src/shared/decorators/successResponse.decorator';
import { Tags } from 'src/shared/enums/api-tags.enum';
import { PublicUserDTO } from 'src/users/dto/public-user.dto';
import { UpdateUserDTO } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('/')
@ApiTags(Tags.COMMON)
@ApiBearerAuth('accessToken')
export class CommonUsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @ApiCreatedResponse({ type: PublicUserDTO })
  @ApiOperation({ summary: 'Get logged user data' })
  findOne(@Request() request: any) {
    // console.log(request);

    const { userId } = request.user;
    return this.usersService.findOne(userId);
  }

  @Patch('me')
  @ApiCreatedResponse({ type: PublicUserDTO })
  @ApiOperation({ summary: 'Update logged user data' })
  update(@Body() updateUserDto: UpdateUserDTO, @Request() request: any) {
    const { userId } = request.user;
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete('me')
  @ApiOperation({ summary: 'Delete logged user account' })
  @ApiSuccessResponse()
  async remove(@Request() request: any) {
    const { userId } = request.user;
    const success = await this.usersService.destroy(userId);
    return Boolean({ success });
  }
}
