import { ApiProperty } from '@nestjs/swagger';

export class AuthBodyDTO {
  @ApiProperty({ default: 'admin' })
  username: string;

  @ApiProperty({ default: '123456' })
  password: string;
}
