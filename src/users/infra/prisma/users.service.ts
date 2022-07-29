import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UpdateUserDTO } from 'src/users/dto/update-user.dto';
import { IUserDTO } from 'src/users/dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { HASH_SALT } from 'src/main';
import { Injectable } from '@nestjs/common';
import { IUsersService } from '../interfaces/users.service';

@Injectable()
export class PrismaUserService implements IUsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    data.password = bcrypt.hashSync(data.password, HASH_SALT);
    const user = await this.prisma.user.create({ data });
    delete user.password;
    return user;
  }

  async list(skip: number, take: number) {
    const users = await this.prisma.user.findMany({ skip, take });
    users.forEach((user) => {
      delete user.password;
      delete user.accessToken;
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    delete user.password;
    return user;
  }

  findByUsername(username: string): Promise<IUserDTO> {
    return this.prisma.user.findFirst({ where: { username } });
  }

  async getUserFromAccessToken(accessToken: string): Promise<IUserDTO> {
    const user = await this.prisma.user.findFirst({
      where: { accessToken },
    });

    delete user.password;
    delete user.accessToken;

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDTO) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    delete user.password;
    delete user.accessToken;

    return user;
  }

  async updateAccessToken(id: number, accessToken: string) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { accessToken },
    });

    delete user.password;

    return user;
  }

  async destroy(id: number) {
    const success = await this.prisma.user.delete({ where: { id } });
    return Boolean(success);
  }
}
