import React from 'react';
import { Metadata } from 'next';

import LoginForm from '@/components/LoginForm';

export const metadata: Metadata = {
  title: 'Artist Management Login',
  description: 'Artist management login page',
};

const Login = () => {
  return <LoginForm />;
};

export default Login;
