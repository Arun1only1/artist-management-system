import {
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PHONE_MAX_LENGTH,
  PHONE_MIN_LENGTH,
  ADDRESS_MAX_LENGTH,
} from "../../constant/general.constant";
import * as Yup from "yup";

import MSG from "../../constant/validation.messages";

import { Gender } from "../../constant/enums/gender.enum";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "../../constant/general.constant";
import { Role } from "@/permissions/role.enum";
export const registerUserValidationSchema = Yup.object({
  firstName: Yup.string()
    .required(MSG.FIRST_NAME_REQUIRED)
    .trim()
    .max(FIRST_NAME_MAX_LENGTH, MSG.FIRST_NAME_MAX_LENGTH),

  lastName: Yup.string()
    .required(MSG.LAST_NAME_REQUIRED)
    .trim()
    .max(LAST_NAME_MAX_LENGTH, MSG.LAST_NAME_MAX_LENGTH),

  email: Yup.string()
    .email(MSG.EMAIL_MUST_BE_VALID)
    .required(MSG.EMAIL_REQUIRED)
    .max(EMAIL_MAX_LENGTH, MSG.EMAIL_MAX_LENGTH)
    .trim()
    .lowercase(),

  password: Yup.string()
    .required(MSG.PASSWORD_REQUIRED)
    .min(PASSWORD_MIN_LENGTH, MSG.PASSWORD_MIN_LENGTH)
    .max(PASSWORD_MAX_LENGTH, MSG.PASSWORD_MAX_LENGTH)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      MSG.PASSWORD_VALID_PATTERN
    ),

  phone: Yup.string()
    .required(MSG.PHONE_REQUIRED)
    .max(PHONE_MAX_LENGTH, MSG.PHONE_MAX_LENGTH)
    .min(PHONE_MIN_LENGTH, MSG.PHONE_MIN_LENGTH),

  role: Yup.string()
    .required(MSG.ROLE_REQUIRED)
    .oneOf(
      [Role.SUPER_ADMIN, Role.ARTIST_MANAGER],
      MSG.ROLE_ADMIN_OR_ARTIST_MANAGER
    ),

  dob: Yup.date().required(MSG.DOB_REQUIRED),
  // .max(Date.now(), MSG.DOB_CANNOT_BE_FUTURE_DATE),

  gender: Yup.string()
    .required(MSG.GENDER_REQUIRED)
    .oneOf([Gender.MALE, Gender.FEMALE, Gender.OTHER], MSG.GENDER_OPTIONS),

  address: Yup.string()
    .required(MSG.ADDRESS_REQUIRED)
    .max(ADDRESS_MAX_LENGTH, MSG.ADDRESS_MAX_LENGTH),
});
