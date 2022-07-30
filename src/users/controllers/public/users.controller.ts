import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiTag } from 'src/shared/enums/api-tags.enum';
import { UsersService } from 'src/users/users.service';

@Controller('users')
@ApiTags(ApiTag.PUBLIC)
export class PublicUsersController {
  constructor(private usersService: UsersService) {}
}
