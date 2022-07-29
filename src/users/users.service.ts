import { Injectable } from '@nestjs/common';
import { IUsersService } from './infra/interfaces/users.service';
import { PrismaUserService } from './infra/prisma/users.service';

@Injectable()
export class UsersService extends PrismaUserService implements IUsersService {}
