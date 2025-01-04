import { Metadata } from 'next';

import RegisterForm from '@/components/RegisterForm';

export const metadata: Metadata = {
  title: 'Artist Management Register',
  description: 'Artist management register page',
};

const Register = () => <RegisterForm name='Register' action='register' />;

export default Register;
