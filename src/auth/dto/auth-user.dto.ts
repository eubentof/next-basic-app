import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from 'src/users/entities/user.entity';

export class AuthUserDTO extends UserEntity {
  @ApiProperty()
  accessToken: string;
}
