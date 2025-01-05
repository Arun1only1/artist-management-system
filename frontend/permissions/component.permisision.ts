import { Role } from '@/constant/enums/role.enum';

export const permissionList = [
  {
    resource: 'user',
    role: Role.SUPER_ADMIN,
    allow: ['list', 'delete', 'update'],
  },
  {
    resource: 'artist',
    role: Role.ARTIST_MANAGER,
  },
];
