import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission, userRoles } from 'src/user/roles/role.and.permission';
import { PERMISSION_KEY } from '../decorators/permission.decorator';
import Lang from 'src/constants/language';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const routePermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!routePermissions || routePermissions.length === 0) {
      throw new ForbiddenException(Lang.NO_PERMISSION_FOR_THIS_ROUTE);
    }

    const request = context.switchToHttp().getRequest();
    const { userId, userRole } = request;

    if (!userId || !userRole) {
      throw new UnauthorizedException(Lang.USER_NOT_AUTHENTICATED);
    }

    const userPermissions = userRoles.find(
      (role) => role.name === userRole,
    )?.permissions;

    if (!userPermissions) {
      throw new ForbiddenException(Lang.USER_ROLE_HAS_NO_PERMISSION);
    }

    for (const routePermission of routePermissions) {
      const userPermission = userPermissions.find(
        (perm) => perm.resource === routePermission.resource,
      );

      if (
        !userPermission ||
        !this.hasRequiredActions(
          userPermission.actions,
          routePermission.actions,
        )
      ) {
        throw new ForbiddenException(Lang.USER_DOES_NOT_HAVE_PERMISSION);
      }
    }

    return true;
  }

  private hasRequiredActions(
    userActions: string[],
    requiredActions: string[],
  ): boolean {
    return requiredActions.every((action) => userActions.includes(action));
  }
}
