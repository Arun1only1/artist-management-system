import { getRoleAndPermission } from "@/permissions/component.permission";
import { Role } from "@/permissions/role.enum";

export const isArtist = () => {
  const { role } = getRoleAndPermission();

  return role === Role.ARTIST;
};
