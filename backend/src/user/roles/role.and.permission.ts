import { Action } from '../enum/action.enum';
import { Resource } from '../enum/resource.enum';
import { UserRole } from '../enum/user.role.enum';

export interface Permission {
  resource: Resource;
  actions: Action[];
}

export interface UserRoleAndPermission {
  name: UserRole;
  permissions: Permission[];
}

export const userRoles: UserRoleAndPermission[] = [
  {
    name: UserRole.SUPER_ADMIN,
    permissions: [
      {
        resource: Resource.USER,
        actions: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE],
      },
      { resource: Resource.ARTIST, actions: [Action.READ] },
      { resource: Resource.SONG, actions: [Action.READ] },
    ],
  },

  {
    name: UserRole.ARTIST_MANAGER,
    permissions: [
      {
        resource: Resource.ARTIST,
        actions: [
          Action.CREATE,
          Action.READ,
          Action.UPDATE,
          Action.DELETE,
          Action.IMPORT_CSV,
          Action.EXPORT_CSV,
        ],
      },
      { resource: Resource.SONG, actions: [Action.READ] },
    ],
  },

  {
    name: UserRole.ARTIST,
    permissions: [
      {
        resource: Resource.SONG,
        actions: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE],
      },
    ],
  },
];
