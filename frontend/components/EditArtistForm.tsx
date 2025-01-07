'use client';

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
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

import {
  DEFAULT_DATE_FORMAT,
  genderOptions,
} from '@/constant/general.constant';
import ROUTES from '@/constant/route.constants';
import {
  getArtistDetails,
  updateArtist,
} from '@/lib/api-routes/artist/artist.routes';
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from '@/store/slices/snackbarSlice';
import { getMessageFromError } from '@/utils/get.message.from.error';
import { editArtistValidationSchema } from '@/validation-schema/artist/edit.artist.validation.schema';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Loader from './Loader/Loader';

export interface EditArtistProps {
  id: string;
  numberOfAlbums: number;
  firstReleaseYear: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    dob: string;
    gender: string;
  };
}

export interface EditArtistFormValuesType {
  id: number;
  numberOfAlbums: number;
  firstReleaseYear: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  gender: string;
}

// edit user form
const EditArtistForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  //   params
  const params = useParams();
  const artistId = params.id;

  //   get artist details
  const { isPending, data } = useQuery({
    queryKey: ['get-artist-details'],
    queryFn: () => getArtistDetails(artistId as string),
  });

  const artistData = data?.data?.artist;

  //   update  artist mutation
  const { isPending: updatePending, mutate } = useMutation({
    mutationKey: ['edit-artist'],
    mutationFn: async (values: EditArtistFormValuesType) => {
      return await updateArtist(artistId as string, {
        ...values,
        firstReleaseYear: Number(values.firstReleaseYear),
      });
    },
    onSuccess: (res) => {
      router.push(ROUTES.ARTIST);
      dispatch(openSuccessSnackbar({ message: res?.data?.message }));
    },
    onError: (error) => {
      dispatch(openErrorSnackbar({ message: getMessageFromError(error) }));
    },
  });

  if (isPending || updatePending) {
    return <Loader />;
  }

  return (
    <Box>
      <Formik
        enableReinitialize
        initialValues={
          {
            firstName: artistData?.user?.firstName || '',
            lastName: artistData?.user?.lastName || '',
            email: artistData?.user?.email || '',

            phone: artistData?.user?.phone || '',
            address: artistData?.user?.address || '',

            dob: artistData?.user?.dob || null,
            gender: artistData?.user?.gender || '',
            firstReleaseYear: artistData?.firstReleaseYear,
            numberOfAlbums: artistData?.numberOfAlbums,
          } as EditArtistFormValuesType
        }
        validationSchema={editArtistValidationSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {({
          handleSubmit,
          getFieldProps,
          errors,
          touched,
          setFieldValue,
          values,
        }) => (
          <form onSubmit={handleSubmit} className='form w-[450px] gap-4'>
            <Typography variant='h4'>Edit Artist</Typography>
            <FormControl fullWidth>
              <TextField
                label='First Name'
                {...getFieldProps('firstName')}
                error={!!errors.firstName && !!touched.firstName}
              />

              {touched.firstName && errors.firstName ? (
                <FormHelperText error>{errors.firstName}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label='Last Name'
                {...getFieldProps('lastName')}
                error={!!errors.lastName && !!touched.lastName}
              />
              {touched.lastName && errors.lastName ? (
                <FormHelperText error>{errors.lastName}</FormHelperText>
              ) : null}
            </FormControl>

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

            <FormControl fullWidth>
              <TextField
                label='Phone Number'
                {...getFieldProps('phone')}
                error={!!errors.phone && !!touched.phone}
              />
              {touched.phone && errors.phone ? (
                <FormHelperText error>{errors.phone}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label='Address'
                {...getFieldProps('address')}
                error={!!errors.address && !!touched.address}
              />
              {touched.address && errors.address ? (
                <FormHelperText error>{errors.address}</FormHelperText>
              ) : null}
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
                <FormHelperText error>{errors.gender}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    value={values?.dob ? dayjs(values?.dob) : null}
                    onChange={(date) => {
                      setFieldValue(
                        'dob',
                        dayjs(date).format(DEFAULT_DATE_FORMAT)
                      );
                    }}
                    label='DOB'
                    className='w-full'
                    maxDate={dayjs()}
                    minDate={dayjs('1900-01-01')}
                  />
                </DemoContainer>
              </LocalizationProvider>
              {touched.dob && errors.dob ? (
                <FormHelperText error>{errors.dob}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                type='number'
                label='Number Of Albums'
                {...getFieldProps('numberOfAlbums')}
                error={!!errors.numberOfAlbums && !!touched.numberOfAlbums}
              />
              {touched.numberOfAlbums && errors.numberOfAlbums ? (
                <FormHelperText error>{errors.numberOfAlbums}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    value={
                      values?.firstReleaseYear
                        ? dayjs(`${values?.firstReleaseYear}-01-01`)
                        : null
                    }
                    onChange={(date) => {
                      setFieldValue(
                        'firstReleaseYear',
                        dayjs(date).format('YYYY')
                      );
                    }}
                    maxDate={dayjs()}
                    yearsOrder='desc'
                    label={'First release year'}
                    openTo='year'
                    views={['year']}
                    className='w-full'
                  />
                </DemoContainer>
              </LocalizationProvider>
              {touched.firstReleaseYear && errors.firstReleaseYear && (
                <FormHelperText error>{errors.firstReleaseYear}</FormHelperText>
              )}
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

export default EditArtistForm;
