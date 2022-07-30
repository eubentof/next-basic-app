import { ApiProperty } from '@nestjs/swagger';
import { IUserDTO } from './user.dto';

export class PublicUserDTO implements Partial<IUserDTO> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  admin: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
