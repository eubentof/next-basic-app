import { ApiProperty } from '@nestjs/swagger';

export class AuthBodyDTO {
  @ApiProperty({ default: 'johndoe' })
  username: string;

  @ApiProperty({ default: '123456' })
  password: string;
}
