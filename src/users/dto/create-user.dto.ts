import { ApiProperty } from '@nestjs/swagger';
import { IUserDTO } from './user.dto';

export class CreateUserDTO implements Partial<IUserDTO> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  confirmPassword?: string;
}
