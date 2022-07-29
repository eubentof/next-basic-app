import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDTO } from './create-user.dto';
import { IUserDTO } from './user.dto';

export class UpdateUserDTO
  extends PartialType(CreateUserDTO)
  implements Partial<IUserDTO>
{
  accessToken?: string;
}
