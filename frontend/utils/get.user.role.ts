import { Role } from '@/constant/enums/role.enum';

export const getUserRole = () => {
  let role;

  if (typeof window !== 'undefined') {
    role = window.localStorage.getItem('role');
  }

  return role;
};

export const isSuperAdmin = () => {
  const role = getUserRole();

  return role === Role.SUPER_ADMIN;
};

export const isArtistManager = () => {
  const role = getUserRole();

  return role === Role.ARTIST_MANAGER;
};
export const isArtist = () => {
  const role = getUserRole();

  return role === Role.ARTIST;
};
