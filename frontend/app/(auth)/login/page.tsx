import React from 'react';
import { Metadata } from 'next';

import LoginForm from '@/components/LoginForm';

export const metadata: Metadata = {
  title: ' Login',
  description: 'Artist management login page',
};

const Login = () => <LoginForm />;

export default Login;
