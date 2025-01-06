import * as Yup from 'yup';
import {
  ADDRESS_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH,
  PHONE_MAX_LENGTH,
  PHONE_MIN_LENGTH,
} from '../../constant/general.constant';

import MSG from '../../constant/validation.messages';

import { Gender } from '../../constant/enums/gender.enum';
import { Role } from '../../constant/enums/role.enum';

export const editUserValidationSchema = Yup.object({
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

  phone: Yup.string()
    .required(MSG.PHONE_REQUIRED)
    .max(PHONE_MAX_LENGTH, MSG.PHONE_MAX_LENGTH)
    .min(PHONE_MIN_LENGTH, MSG.PHONE_MIN_LENGTH),

  role: Yup.string()
    .required(MSG.ROLE_REQUIRED)
    .oneOf(
      [Role.SUPER_ADMIN, Role.ARTIST_MANAGER, Role.ARTIST],
      MSG.ROLE_OPTIONS
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
