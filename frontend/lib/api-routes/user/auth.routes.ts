import { UserProps } from '@/components/RegisterForm';
import $axios from '../../axios/axios.instance';
import { LoginUserProps } from '@/components/LoginForm';

export const registerUser = async (values: UserProps) => {
  return await $axios.post('/auth/register', values);
};

export const loginUser = async (values: LoginUserProps) => {
  return await $axios.post('/auth/login', values);
};
