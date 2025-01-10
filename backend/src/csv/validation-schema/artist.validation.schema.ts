import * as Yup from 'yup';

import * as dayjs from 'dayjs';
import {
  ARTIST_MIN_ALBUM_NUMBER,
  ARTIST_MIN_RELEASE_YEAR,
  USER_ADDRESS_MAX_LENGTH,
  USER_EMAIL_MAX_LENGTH,
  USER_FIRST_NAME_MAX_LENGTH,
  USER_LAST_NAME_MAX_LENGTH,
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
  USER_PHONE_MAX_LENGTH,
  USER_PHONE_MIN_LENGTH,
} from 'src/constants/general.constants';
import { Gender } from 'src/user/enum/gender.enum';
import MSG from '../validation-message/artist.validation.message';

export const artistValidationSchema = Yup.object({
  firstName: Yup.string()
    .required(MSG.FIRST_NAME_REQUIRED)
    .trim()
    .max(USER_FIRST_NAME_MAX_LENGTH, MSG.FIRST_NAME_MAX_LENGTH),

  lastName: Yup.string()
    .required(MSG.LAST_NAME_REQUIRED)
    .trim()
    .max(USER_LAST_NAME_MAX_LENGTH, MSG.LAST_NAME_MAX_LENGTH),

  email: Yup.string()
    .email(MSG.EMAIL_MUST_BE_VALID)
    .required(MSG.EMAIL_REQUIRED)
    .max(USER_EMAIL_MAX_LENGTH, MSG.EMAIL_MAX_LENGTH)
    .trim()
    .lowercase(),

  password: Yup.string()
    .required(MSG.PASSWORD_REQUIRED)
    .min(USER_PASSWORD_MIN_LENGTH, MSG.PASSWORD_MIN_LENGTH)
    .max(USER_PASSWORD_MAX_LENGTH, MSG.PASSWORD_MAX_LENGTH)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      MSG.PASSWORD_VALID_PATTERN,
    ),
  phone: Yup.string()
    .required(MSG.PHONE_REQUIRED)
    .max(USER_PHONE_MAX_LENGTH, MSG.PHONE_MAX_LENGTH)
    .min(USER_PHONE_MIN_LENGTH, MSG.PHONE_MIN_LENGTH),

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
      },
    ),

  gender: Yup.string()
    .required(MSG.GENDER_REQUIRED)
    .oneOf([Gender.MALE, Gender.FEMALE, Gender.OTHERS], MSG.GENDER_OPTIONS),

  address: Yup.string()
    .required(MSG.ADDRESS_REQUIRED)
    .max(USER_ADDRESS_MAX_LENGTH, MSG.ADDRESS_MAX_LENGTH),

  firstReleaseYear: Yup.number()
    .min(ARTIST_MIN_RELEASE_YEAR, MSG.FIRST_RELEASE_YEAR_MIN_VALUE)
    .required(MSG.FIRST_RELEASE_YEAR_REQUIRED)
    .max(dayjs().year(), MSG.FIRST_RELEASE_YEAR_CANNOT_BE_FUTURE_DATE),

  numberOfAlbums: Yup.number()
    .min(ARTIST_MIN_ALBUM_NUMBER, MSG.NUMBER_OF_ALBUMS_MIN_VALUE)
    .required(MSG.NUMBER_OF_ALBUMS_REQUIRED),
});
