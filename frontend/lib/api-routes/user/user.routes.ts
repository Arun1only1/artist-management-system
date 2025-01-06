import { EditUserProps } from '@/components/EditUserForm';
import $axios from '../../axios/axios.instance';

export interface PaginationProps {
  page: number;
  limit: number;
}

// get user list
export const getUserList = async ({ page, limit }: PaginationProps) => {
  return await $axios.post('/user/list', { page, limit });
};

// delete user
export const deleteUser = async (userId: string) => {
  return await $axios.delete(`/user/delete/${userId}`);
};

// get user details
export const getUserDetails = async (userId: string) => {
  return await $axios.get(`/user/details/${userId}`);
};

// update user
export const updateUser = async (userId: string, values: EditUserProps) => {
  return await $axios.put(`/user/edit/${userId}`, values);
};
