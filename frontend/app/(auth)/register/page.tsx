import RegisterForm from '@/components/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artist Management Register',
  description: 'Artist management register page',
};
const Register = () => {
  return <RegisterForm />;
};

export default Register;
