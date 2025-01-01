import { UserProps } from '@/components/RegisterForm';
import $axios from '../axios/axios.instance';

export const registerUser = async (values: UserProps) => {
  return await $axios.post('/auth/register', values);
};

// export const loginUser = async (values: any) => {
//   return await $axios.post('/auth/login', values);
// };
