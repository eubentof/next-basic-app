import {
  Controller,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService, Public } from './auth.service';
import { AuthUserDTO } from './dto/auth-user.dto';
import { AuthBodyDTO } from './dto/auth-body.dto';
import { LocalAuthGuard } from './strategies/local/local-auth.guard';
import { ApiTag } from 'src/shared/enums/api-tags.enum';

@Controller('/auth')
@ApiTags(ApiTag.PUBLIC)
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiCreatedResponse({ type: AuthUserDTO })
  @ApiBody({ type: AuthBodyDTO })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
