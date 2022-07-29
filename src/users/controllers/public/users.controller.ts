import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';

@Controller('users')
@ApiTags('Public')
export class PublicUsersController {
  constructor(private usersService: UsersService) {}
}
