"use client";

import { Formik } from "formik";

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
} from "@mui/material";

import { genreOptions } from "@/constant/general.constant";
import { addSong } from "@/lib/api-routes/song/song.routes";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "@/store/slices/snackbarSlice";
import { getMessageFromError } from "@/utils/get.message.from.error";
import { addSongValidationSchema } from "@/validation-schema/song/add.song.validation.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export interface AddSongProps {
  title: string;
  albumName: string;
  genre: string;
}

// register form
const AddSongForm = ({ handleClose }: { handleClose: () => void }) => {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  //   register user mutation
  const { isPending, mutate } = useMutation({
    mutationKey: ["add-song"],
    mutationFn: async (values: AddSongProps) => {
      return await addSong(values);
    },
    onSuccess: (res) => {
      queryClient.refetchQueries({ queryKey: ["get-song-list"] });
      dispatch(openSuccessSnackbar({ message: res?.data?.message }));
    },
    onError: (error) => {
      dispatch(openErrorSnackbar({ message: getMessageFromError(error) }));
    },
    onSettled: () => {
      handleClose();
    },
  });
  return (
    <Box>
      {isPending && <LinearProgress color="success" />}
      <Formik
        initialValues={{
          title: "",
          albumName: "",
          genre: "",
        }}
        validationSchema={addSongValidationSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {({ handleSubmit, getFieldProps, errors, touched }) => (
          <form onSubmit={handleSubmit} className="form w-[400px] gap-4">
            <Typography variant="h4">Add Song</Typography>
            <FormControl fullWidth>
              <TextField
                label="Title"
                {...getFieldProps("title")}
                error={!!errors.title && !!touched.title}
                helperText={errors.title && touched.title && errors.title}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Album Name"
                {...getFieldProps("albumName")}
                error={!!errors.albumName && !!touched.albumName}
                helperText={
                  errors.albumName && touched.albumName && errors.albumName
                }
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Genre</InputLabel>
              <Select label="Genre" {...getFieldProps("genre")}>
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

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="success"
              size="small"
            >
              submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddSongForm;
