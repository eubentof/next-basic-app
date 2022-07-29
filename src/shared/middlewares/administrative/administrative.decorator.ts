import { SetMetadata } from '@nestjs/common';
import { Permissions } from './permissions.enum';
/**
 * This decorator will guard any endpoint and check if the logged user is admin or if has the required permissions.
 *
 * If no permission is given, it will check only if the user is admin.
 *
 * If the user don't have the permissions, it will return a forbiden access error
 *
 * @param permissions the required permissions to access this administrative endpoint
 */
export const Administrative = (...permissions: Permissions[]) =>
  SetMetadata('administrative', permissions);
