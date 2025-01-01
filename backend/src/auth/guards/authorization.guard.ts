import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission, userRoles } from 'src/user/roles/role.and.permission';
import { PERMISSION_KEY } from '../../decorators/permission.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const routePermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!routePermissions || routePermissions.length === 0) {
      throw new ForbiddenException('No permissions defined for this route.');
    }

    const request = context.switchToHttp().getRequest();
    const { userId, userRole } = request;

    if (!userId || !userRole) {
      throw new UnauthorizedException('User is not authenticated.');
    }

    const userPermissions = userRoles.find(
      (role) => role.name === userRole,
    )?.permissions;

    if (!userPermissions) {
      throw new ForbiddenException('User role has no permissions assigned.');
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
        throw new ForbiddenException(
          'User does not have required permissions.',
        );
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
