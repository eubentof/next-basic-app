import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateUserDTO } from './create-user.dto';
import { IUserDTO } from './user.dto';

export class UpdateUserDTO
  extends PartialType(CreateUserDTO)
  implements Partial<IUserDTO>
{
  @Exclude()
  accessToken?: string;
}
