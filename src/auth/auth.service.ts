import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SetMetadata } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { PublicUserDTO } from 'src/users/dto/public-user.dto';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Partial<UserEntity>> {
    const user = await this.usersService.findByUsername(username);

    const passwordMatch = user && bcrypt.compareSync(password, user.password);

    if (passwordMatch) return user;

    return null;
  }

  async login(user: any): Promise<PublicUserDTO> {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const loggedUser = await this.usersService.updateAccessToken(
      user.id,
      accessToken,
    );
    return loggedUser;
  }
}
