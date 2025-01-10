"use client";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Formik } from "formik";

import {
  DEFAULT_DATE_FORMAT,
  genderOptions,
} from "@/constant/general.constant";
import ROUTES from "@/constant/route.constants";
import { addArtist } from "@/lib/api-routes/artist/artist.routes";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "@/store/slices/snackbarSlice";
import { getMessageFromError } from "@/utils/get.message.from.error";
import { addArtistValidationSchema } from "@/validation-schema/artist/add.artist.validation.schema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "./Loader/Loader";
import { Role } from "@/permissions/role.enum";

export interface AddArtistFormValuesType {
  numberOfAlbums: number;
  firstReleaseYear: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  dob: string;
  gender: string;
  role?: string;
}

// edit user form
const AddArtistForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  //   password
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

  //   add  artist mutation
  const { isPending, mutate } = useMutation({
    mutationKey: ["add-artist"],
    mutationFn: async (values: AddArtistFormValuesType) => {
      return await addArtist({
        ...values,
        firstReleaseYear: Number(values.firstReleaseYear),
        role: Role.ARTIST,
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

  if (isPending) {
    return <Loader />;
  }

  return (
    <Box>
      <Formik
        initialValues={
          {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phone: "",
            address: "",
            dob: "",
            gender: "",
            firstReleaseYear: 1900,
            numberOfAlbums: 0,
          } as AddArtistFormValuesType
        }
        validationSchema={addArtistValidationSchema}
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
          <form onSubmit={handleSubmit} className="form w-[400px] gap-4">
            <Typography variant="h5">Add Artist</Typography>
            <FormControl fullWidth>
              <TextField
                label="First Name"
                {...getFieldProps("firstName")}
                error={!!errors.firstName && !!touched.firstName}
              />

              {touched.firstName && errors.firstName ? (
                <FormHelperText error>{errors.firstName}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Last Name"
                {...getFieldProps("lastName")}
                error={!!errors.lastName && !!touched.lastName}
              />
              {touched.lastName && errors.lastName ? (
                <FormHelperText error>{errors.lastName}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Email"
                {...getFieldProps("email")}
                error={!!errors.email && !!touched.email}
              />
              {touched.email && errors.email ? (
                <FormHelperText error>{errors.email}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                {...getFieldProps("password")}
                type={showPassword ? "text" : "password"}
                error={!!errors.email && !!touched.email}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {touched.password && errors.password && (
                <FormHelperText error>{errors.password}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Phone Number"
                {...getFieldProps("phone")}
                error={!!errors.phone && !!touched.phone}
              />
              {touched.phone && errors.phone ? (
                <FormHelperText error>{errors.phone}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Address"
                {...getFieldProps("address")}
                error={!!errors.address && !!touched.address}
              />
              {touched.address && errors.address ? (
                <FormHelperText error>{errors.address}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select label="Gender" {...getFieldProps("gender")}>
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
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    value={values?.dob ? dayjs(values?.dob) : null}
                    onChange={(date) => {
                      setFieldValue(
                        "dob",
                        dayjs(date).format(DEFAULT_DATE_FORMAT)
                      );
                    }}
                    label="DOB"
                    className="w-full"
                    maxDate={dayjs()}
                    minDate={dayjs("1900-01-01")}
                  />
                </DemoContainer>
              </LocalizationProvider>
              {touched.dob && errors.dob ? (
                <FormHelperText error>{errors.dob}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                type="number"
                label="Number Of Albums"
                {...getFieldProps("numberOfAlbums")}
                error={!!errors.numberOfAlbums && !!touched.numberOfAlbums}
              />
              {touched.numberOfAlbums && errors.numberOfAlbums ? (
                <FormHelperText error>{errors.numberOfAlbums}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    onChange={(date) => {
                      setFieldValue(
                        "firstReleaseYear",
                        dayjs(date).format("YYYY")
                      );
                    }}
                    maxDate={dayjs()}
                    yearsOrder="desc"
                    label={"First release year"}
                    openTo="year"
                    views={["year"]}
                    className="w-full"
                  />
                </DemoContainer>
              </LocalizationProvider>
              {touched.firstReleaseYear && errors.firstReleaseYear && (
                <FormHelperText error>{errors.firstReleaseYear}</FormHelperText>
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

export default AddArtistForm;
