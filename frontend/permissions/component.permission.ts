import { Action } from "./action.enum";
import { Resource } from "./resource.enum";

export const getRoleAndPermission = () => {
  if (typeof window !== "undefined") {
    const userSession = window.localStorage?.getItem("userSession");
    if (userSession) {
      return JSON.parse(userSession);
    }
  }
  return { role: null, permissions: [] };
};

export const hasPermission = (resource: Resource, action: Action) => {
  const { role, permissions } = getRoleAndPermission();

  // If no role or permissions, log out the user
  if (!role || permissions.length === 0) {
    return false;
  }

  // Check if user has permission for the given resource and action
  return permissions.some(
    ({
      resource: itemResource,
      actions,
    }: {
      resource: Resource;
      actions: Action;
    }) => itemResource === resource && actions.includes(action)
  );
};
