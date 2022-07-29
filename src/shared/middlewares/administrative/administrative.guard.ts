import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';
import { Permissions } from './permissions.enum';

@Injectable()
export class AdministrativeGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<Permissions[]>(
      'administrative',
      context.getHandler(),
    );

    if (permissions === undefined) return true; // It's not an administrative endpoint

    const {
      headers: { authorization },
    } = context.switchToHttp().getRequest();

    if (!authorization) return false;

    const token = authorization.slice(7); // Removes the "Beare " part

    const user = await this.usersService.getUserFromAccessToken(token);

    if (!user) return false;

    if (user.admin) return true;

    // const userHasPermissions = permissions.some((permission) =>
    //   user.permissions.includes(permission),
    // );
    // if (userHasPermissions) return true;

    return false;
  }
}
