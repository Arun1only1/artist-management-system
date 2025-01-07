import {
  ADDRESS_MAX_LENGTH,
  ALBUM_NAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  FIRST_NAME_MAX_LENGTH,
  FIRST_RELEASE_YEAR_MIN_VALUE,
  LAST_NAME_MAX_LENGTH,
  MIN_NUMBER_OF_ALBUMS,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PHONE_MAX_LENGTH,
  PHONE_MIN_LENGTH,
  TITLE_MAX_LENGTH,
} from './general.constant';

const MSG = {
  EN: {
    // register
    FIRST_NAME_REQUIRED: 'First name is required.',
    FIRST_NAME_MAX_LENGTH: `First name must be at most  ${FIRST_NAME_MAX_LENGTH} characters.`,

    LAST_NAME_REQUIRED: 'Last name is required.',
    LAST_NAME_MAX_LENGTH: `Last name must be at most  ${LAST_NAME_MAX_LENGTH} characters.`,

    EMAIL_REQUIRED: 'Email is required.',
    EMAIL_MUST_BE_VALID: 'Email must be a valid email.',
    EMAIL_MAX_LENGTH: `Email must be at most  ${EMAIL_MAX_LENGTH} characters.`,

    PASSWORD_REQUIRED: 'Password is required.',
    PASSWORD_MIN_LENGTH: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
    PASSWORD_MAX_LENGTH: `Password must be at most ${PASSWORD_MAX_LENGTH} characters.`,

    PHONE_REQUIRED: 'Phone number is required.',
    PHONE_MAX_LENGTH: `Phone must be at most ${PHONE_MAX_LENGTH} characters.`,
    PHONE_MIN_LENGTH: `Phone must be at least ${PHONE_MIN_LENGTH} characters.`,

    ROLE_REQUIRED: 'Role is required.',
    ROLE_OPTIONS:
      "Role must be one of the following: 'super_admin', 'artist_manager', 'artist'.",

    DOB_REQUIRED: 'Date of birth is required.',
    DOB_CANNOT_BE_FUTURE_DATE: 'Date of birth cannot be future date.',
    DOB_CANNOT_BE_GREATER_THAN_FIRST_RELEASE_YEAR:
      'Date of birth should be smaller date than first release year.',

    GENDER_REQUIRED: 'Gender is required.',

    GENDER_OPTIONS: "Gender must be one of the following: 'm', 'f', 'o'.",

    ADDRESS_REQUIRED: 'Address is required.',
    ADDRESS_MAX_LENGTH: `Address must be at most ${ADDRESS_MAX_LENGTH} characters.`,

    // song
    TITLE_REQUIRED: 'Title is required.',
    ALBUM_NAME_REQUIRED: 'Album name is required.',
    GENRE_REQUIRED: 'Genre is required.',

    TITLE_MAX_LENGTH: `Title must be at most ${TITLE_MAX_LENGTH} characters.`,
    ALBUM_NAME_MAX_LENGTH: `Title must be at most ${ALBUM_NAME_MAX_LENGTH} characters.`,
    PROVIDE_VALID_GENRE:
      'Provide valid genre which is either rnb or country or classic or rock or jazz.',

    FIRST_RELEASE_YEAR_REQUIRED: 'First release year is required.',
    FIRST_RELEASE_YEAR_MIN_VALUE: `First release year cannot be less than ${FIRST_RELEASE_YEAR_MIN_VALUE}.`,
    FIRST_RELEASE_YEAR_CANNOT_BE_FUTURE_DATE:
      'First release year cannot be future date.',

    NUMBER_OF_ALBUMS_REQUIRED: 'Number of albums is required.',
    NUMBER_OF_ALBUMS_MIN_VALUE: `Number of albums cannot be less than ${MIN_NUMBER_OF_ALBUMS}.`,
  },
};

export default MSG.EN;
