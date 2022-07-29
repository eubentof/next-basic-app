import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/services/infra/prisma/prisma.module';
import { AdministrativeUsersController } from './controllers/administrative/users.controller';
import { CommonUsersController } from './controllers/common/users.controller';
import { PublicUsersController } from './controllers/public/users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [
    AdministrativeUsersController,
    CommonUsersController,
    PublicUsersController,
  ],
  providers: [UsersService],
  imports: [PrismaModule],
  exports: [UsersService],
})
export class UsersModule {}
