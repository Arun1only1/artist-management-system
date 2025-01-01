import {
  ARTIST,
  ARTIST_MANAGER,
  CREATE,
  DELETE,
  EXPORT_CSV,
  IMPORT_CSV,
  READ,
  SONG,
  SUPER_ADMIN,
  UPDATE,
  USER,
} from 'src/constants/user.role.constants';

export interface Permission {
  resource: string;
  actions: string[];
}

export interface UserRole {
  name: string;
  permissions: Permission[];
}

export const userRoles: UserRole[] = [
  {
    name: SUPER_ADMIN,
    permissions: [
      {
        resource: USER,
        actions: [CREATE, READ, UPDATE, DELETE],
      },
      { resource: ARTIST, actions: [READ] },
      { resource: SONG, actions: [READ] },
    ],
  },

  {
    name: ARTIST_MANAGER,
    permissions: [
      {
        resource: ARTIST,
        actions: [CREATE, READ, UPDATE, DELETE, IMPORT_CSV, EXPORT_CSV],
      },
      { resource: SONG, actions: [READ] },
    ],
  },

  {
    name: ARTIST,
    permissions: [
      {
        resource: SONG,
        actions: [CREATE, READ, UPDATE, DELETE],
      },
    ],
  },
];
