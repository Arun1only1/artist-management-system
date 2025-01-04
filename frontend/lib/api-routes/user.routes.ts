import $axios from '../axios/axios.instance';

interface PaginationProps {
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
