import { SetMetadata } from '@nestjs/common';
import { Permission } from 'src/user/roles/role.and.permission';

export const PERMISSION_KEY = 'Permissions';

export const Permissions = (permissions: Permission[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
