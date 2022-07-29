import { ApiProperty } from '@nestjs/swagger';

export class ListUserQueryDTO {
  @ApiProperty({ default: 1 })
  page: number;

  @ApiProperty({ default: 10 })
  totalPerPage: number;
}
