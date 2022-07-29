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

@Controller('/auth')
@ApiTags('Public')
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
