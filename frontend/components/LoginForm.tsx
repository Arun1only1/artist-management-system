'use client';
import { useState } from 'react';

import { Formik } from 'formik';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';

import { loginUser } from '@/lib/api-routes/user/auth.routes';
import { loginUserValidationSchema } from '@/validation-schema/user/login.user.validation.schema';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { openErrorSnackbar } from '@/store/slices/snackbarSlice';
import { CustomError } from '@/interface/error.interface';
import { getMessageFromError } from '@/utils/get.message.from.error';

export interface LoginUserProps {
  email: string;
  password: string;
}
// register form
const LoginForm = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  //   register user mutation
  const { isPending, mutate } = useMutation({
    mutationKey: ['login-user'],
    mutationFn: async (values: LoginUserProps) => {
      return await loginUser(values);
    },
    onSuccess: (res) => {
      window.localStorage.setItem('token', res?.data?.accessToken);
      window.localStorage.setItem(
        'firstName',
        res?.data?.userDetails?.firstName
      );
      window.localStorage.setItem('role', res?.data?.userDetails?.role);

      router.push('/');
    },
    onError: (error: CustomError) => {
      dispatch(openErrorSnackbar({ message: getMessageFromError(error) }));
    },
  });
  return (
    <Box>
      {isPending && <LinearProgress color='success' />}
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginUserValidationSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {({ handleSubmit, getFieldProps, errors, touched }) => (
          <form onSubmit={handleSubmit} className='form w-[400px] gap-10 '>
            <Typography variant='h4'>Login</Typography>

            <FormControl fullWidth>
              <TextField
                label='Email'
                {...getFieldProps('email')}
                error={!!errors.email && !!touched.email}
              />
              {touched.email && errors.email ? (
                <FormHelperText error>{errors.email}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl variant='outlined' fullWidth>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                {...getFieldProps('password')}
                type={showPassword ? 'text' : 'password'}
                error={!!errors.email && !!touched.email}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Password'
              />
              {touched.password && errors.password && (
                <FormHelperText error>{errors.password}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth className='flex justify-center items-center'>
              <Button
                fullWidth
                type='submit'
                variant='contained'
                color='success'
              >
                Sign in
              </Button>

              <Link href='/register' className='text-blue-500 underline mt-3'>
                New here? Register
              </Link>
            </FormControl>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
