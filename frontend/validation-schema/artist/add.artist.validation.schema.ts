import * as Yup from 'yup';
import {
  ADDRESS_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  FIRST_NAME_MAX_LENGTH,
  FIRST_RELEASE_YEAR_MIN_VALUE,
  LAST_NAME_MAX_LENGTH,
  MIN_NUMBER_OF_ALBUMS,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PHONE_MAX_LENGTH,
  PHONE_MIN_LENGTH,
} from '../../constant/general.constant';

import MSG from '../../constant/validation.messages';

import { Gender } from '../../constant/enums/gender.enum';
import dayjs from 'dayjs';

export const addArtistValidationSchema = Yup.object({
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
    .max(PASSWORD_MAX_LENGTH, MSG.PASSWORD_MAX_LENGTH),

  phone: Yup.string()
    .required(MSG.PHONE_REQUIRED)
    .max(PHONE_MAX_LENGTH, MSG.PHONE_MAX_LENGTH)
    .min(PHONE_MIN_LENGTH, MSG.PHONE_MIN_LENGTH),

  dob: Yup.date()
    .required(MSG.DOB_REQUIRED)
    .test(
      'dob',
      MSG.DOB_CANNOT_BE_GREATER_THAN_FIRST_RELEASE_YEAR,
      function (value) {
        const { firstReleaseYear } = this.parent;
        return (
          !value || !firstReleaseYear || dayjs(value).year() <= firstReleaseYear
        );
      }
    ),

  gender: Yup.string()
    .required(MSG.GENDER_REQUIRED)
    .oneOf([Gender.MALE, Gender.FEMALE, Gender.OTHER], MSG.GENDER_OPTIONS),

  address: Yup.string()
    .required(MSG.ADDRESS_REQUIRED)
    .max(ADDRESS_MAX_LENGTH, MSG.ADDRESS_MAX_LENGTH),

  //   dob should not be greater than firstReleaseYearDate
  firstReleaseYear: Yup.number()
    .min(FIRST_RELEASE_YEAR_MIN_VALUE, MSG.FIRST_RELEASE_YEAR_MIN_VALUE)
    .required(MSG.FIRST_RELEASE_YEAR_REQUIRED)
    .max(dayjs().year(), MSG.FIRST_RELEASE_YEAR_CANNOT_BE_FUTURE_DATE),

  numberOfAlbums: Yup.number()
    .min(MIN_NUMBER_OF_ALBUMS, MSG.NUMBER_OF_ALBUMS_MIN_VALUE)
    .required(MSG.NUMBER_OF_ALBUMS_REQUIRED),
});
