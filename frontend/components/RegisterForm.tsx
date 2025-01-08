"use client";
import { useState } from "react";

import dayjs from "dayjs";
import { Formik } from "formik";

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
  LinearProgress,
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

import {
  genderOptions,
  REGISTER,
  registerUserRoleOptions,
} from "@/constant/general.constant";
import { registerUser } from "@/lib/api-routes/user/auth.routes";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "@/store/slices/snackbarSlice";
import { getMessageFromError } from "@/utils/get.message.from.error";
import { registerUserValidationSchema } from "@/validation-schema/user/register.user.validation.schema";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
  dob: string;
  gender: string;
  firstReleaseYear?: number;
  numberOfAlbums?: number;
}

interface RegisterFormProps {
  name: string;
  action: string;
}
// register form
const RegisterForm = ({ name, action }: RegisterFormProps) => {
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
    mutationKey: ["register-user"],
    mutationFn: async (values: UserProps) => {
      return await registerUser(values);
    },
    onSuccess: (res) => {
      router.push(action === "register" ? "/login" : "/");
      dispatch(openSuccessSnackbar({ message: res?.data?.message }));
    },
    onError: (error) => {
      dispatch(openErrorSnackbar({ message: getMessageFromError(error) }));
    },
  });
  return (
    <Box>
      {isPending && <LinearProgress color="success" />}
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phone: "",
          address: "",
          role: "",
          dob: "",
          gender: "",
        }}
        validationSchema={registerUserValidationSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {({ handleSubmit, getFieldProps, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit} className="form w-[400px] gap-4">
            <Typography variant="h4">{name}</Typography>
            <FormControl fullWidth>
              <TextField
                label="First Name"
                {...getFieldProps("firstName")}
                error={!!errors.firstName && !!touched.firstName}
                helperText={
                  errors.firstName && touched.firstName && errors.firstName
                }
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Last Name"
                {...getFieldProps("lastName")}
                error={!!errors.lastName && !!touched.lastName}
                helperText={
                  errors.lastName && touched.lastName && errors.lastName
                }
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Email"
                {...getFieldProps("email")}
                error={!!errors.email && !!touched.email}
                helperText={errors.email && touched.email && errors.email}
              />
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
                helperText={errors.phone && touched.phone && errors.phone}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Address"
                {...getFieldProps("address")}
                error={!!errors.address && !!touched.address}
                helperText={errors.address && touched.address && errors.address}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label="Role" {...getFieldProps("role")}>
                {registerUserRoleOptions.map((item) => (
                  <MenuItem key={item.id} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
              {touched.role && errors.role && (
                <FormHelperText error>{errors.role}</FormHelperText>
              )}
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
                    onChange={(date) => {
                      setFieldValue("dob", dayjs(date).format("YYYY-MM-DD"));
                    }}
                    label="DOB"
                    className="w-full"
                    maxDate={dayjs()}
                    minDate={dayjs("1900-01-01")}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth className="flex justify-center items-center">
              <Button
                disabled={isPending}
                fullWidth
                type="submit"
                variant="contained"
                color="success"
                size="small"
              >
                submit
              </Button>

              {action === REGISTER && (
                <Link href="/login" className="text-blue-500 underline mt-3">
                  Already registered? Login
                </Link>
              )}
            </FormControl>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterForm;
