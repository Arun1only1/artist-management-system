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
import { Formik } from 'formik';

import { genreOptions } from '@/constant/general.constant';
import { getSongDetails, updateSong } from '@/lib/api-routes/song/song.routes';
import { addSongValidationSchema } from '@/validation-schema/song/add.song.validation.schema';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Loader from './Loader/Loader';
import ROUTES from '@/constant/route.constants';
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from '@/store/slices/snackbarSlice';
import { getMessageFromError } from '@/utils/get.message.from.error';

export interface SongDataProps {
  title: string;
  albumName: string;
  genre: string;
}
// edit user form
const EditSongForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  //   params
  const params = useParams();
  const songId = params.id;

  //   get artist details
  const { isPending, data } = useQuery({
    queryKey: ['get-song-details'],
    queryFn: () => getSongDetails(songId as string),
  });

  const songData: SongDataProps = data?.data;

  // update  artist mutation
  const { isPending: updatePending, mutate } = useMutation({
    mutationKey: ['edit-song'],
    mutationFn: async (values: SongDataProps) => {
      return await updateSong(songId as string, values);
    },
    onSuccess: (res) => {
      router.push(ROUTES.SONG);
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
        initialValues={{
          title: songData.title || '',
          albumName: songData.albumName || '',
          genre: songData.genre || '',
        }}
        validationSchema={addSongValidationSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {({ handleSubmit, getFieldProps, errors, touched }) => (
          <form onSubmit={handleSubmit} className='form w-[450px] gap-4'>
            <Typography variant='h4'>Edit Song</Typography>
            <FormControl fullWidth>
              <TextField
                label='Title'
                {...getFieldProps('title')}
                error={!!errors.title && !!touched.title}
              />

              {touched.title && errors.title ? (
                <FormHelperText error>{errors.title}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label='Album Name'
                {...getFieldProps('albumName')}
                error={!!errors.albumName && !!touched.albumName}
              />
              {touched.albumName && errors.albumName ? (
                <FormHelperText error>{errors.albumName}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Genre</InputLabel>
              <Select label='Genre' {...getFieldProps('genre')}>
                {genreOptions.map((item) => (
                  <MenuItem key={item.id} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
              {touched.genre && errors.genre && (
                <FormHelperText error>{errors.genre}</FormHelperText>
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

export default EditSongForm;
