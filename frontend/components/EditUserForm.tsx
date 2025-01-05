'use client';

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Formik } from 'formik';

import { genderOptions, roleOptions } from '@/constant/general.constant';
import ROUTES from '@/constant/route.constants';
import { getUserDetails, updateUser } from '@/lib/api-routes/user/user.routes';
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from '@/store/slices/snackbarSlice';
import { getMessageFromError } from '@/utils/get.message.from.error';
import { editUserValidationSchema } from '@/validation-schema/user/edit.user.validation.schema';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export interface EditUserProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  dob: string;
  gender: string;
}

// edit user form
const EditUserForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  //   params
  const params = useParams();
  const userId = params.id;

  //   get user details
  const { isPending: getUserDetailPending, data } = useQuery({
    queryKey: ['get-user-details'],
    queryFn: () => getUserDetails(userId as string),
  });

  const userDetails = data?.data;

  //   update  user mutation
  const { isPending, mutate } = useMutation({
    mutationKey: ['edit-user'],
    mutationFn: async (values: EditUserProps) => {
      return await updateUser(userId as string, values);
    },
    onSuccess: (res) => {
      router.push(ROUTES.HOME);
      dispatch(openSuccessSnackbar({ message: res?.data?.message }));
    },
    onError: (error) => {
      dispatch(openErrorSnackbar({ message: getMessageFromError(error) }));
    },
  });

  return (
    <Box>
      {(isPending || getUserDetailPending) && (
        <LinearProgress color='success' />
      )}
      <Formik
        enableReinitialize
        initialValues={{
          firstName: userDetails?.firstName || '',
          lastName: userDetails?.lastName || '',
          email: userDetails?.email || '',

          phone: userDetails?.phone || '',
          address: userDetails?.address || '',
          role: userDetails?.role || '',
          dob: userDetails?.dob || null,
          gender: userDetails?.gender || '',
        }}
        validationSchema={editUserValidationSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {({ handleSubmit, getFieldProps, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit} className='form w-[450px] gap-4'>
            <Typography variant='h4'>Edit User</Typography>
            <FormControl fullWidth>
              <TextField
                label='First Name'
                {...getFieldProps('firstName')}
                error={!!errors.firstName && !!touched.firstName}
                helperText={
                  !!errors?.firstName &&
                  !!touched?.firstName &&
                  !!errors?.firstName
                }
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label='Last Name'
                {...getFieldProps('lastName')}
                error={!!errors.lastName && !!touched.lastName}
                helperText={
                  !!errors?.lastName &&
                  !!touched?.lastName &&
                  !!errors?.lastName
                }
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label='Email'
                {...getFieldProps('email')}
                error={!!errors.email && !!touched.email}
                helperText={
                  !!errors?.email && !!touched?.email && !!errors?.email
                }
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label='Phone Number'
                {...getFieldProps('phone')}
                error={!!errors.phone && !!touched.phone}
                helperText={
                  !!errors?.phone && !!touched?.phone && !!errors?.phone
                }
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label='Address'
                {...getFieldProps('address')}
                error={!!errors.address && !!touched.address}
                helperText={
                  !!errors?.address && !!touched?.address && !!errors?.address
                }
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label='Role' {...getFieldProps('role')}>
                {roleOptions.map((item) => (
                  <MenuItem key={item.id} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
              {touched.role && errors.role && (
                <FormHelperText error>
                  {errors?.role?.toString()}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select label='Gender' {...getFieldProps('gender')}>
                {genderOptions.map((item) => (
                  <MenuItem key={item.id} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
              {touched.gender && errors.gender && (
                <FormHelperText error>
                  {typeof errors.gender === 'string' && errors.gender}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    defaultValue={
                      userDetails?.dob ? dayjs(userDetails?.dob) : null
                    }
                    onChange={(date) => {
                      setFieldValue('dob', dayjs(date).format('YYYY-MM-DD'));
                    }}
                    label='DOB'
                    className='w-full'
                    maxDate={dayjs()}
                    minDate={dayjs('1900-01-01')}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>

            <Button fullWidth type='submit' variant='contained' color='success'>
              submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditUserForm;
