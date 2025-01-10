import {
  ARTIST_MIN_ALBUM_NUMBER,
  ARTIST_MIN_RELEASE_YEAR,
  USER_ADDRESS_MAX_LENGTH,
  USER_EMAIL_MAX_LENGTH,
  USER_FIRST_NAME_MAX_LENGTH,
  USER_LAST_NAME_MAX_LENGTH,
  USER_PASSWORD_MAX_LENGTH_IN_DB,
  USER_PASSWORD_MIN_LENGTH,
  USER_PHONE_MAX_LENGTH,
  USER_PHONE_MIN_LENGTH,
} from 'src/constants/general.constants';

const ArtistValidationMessage = {
  EN: {
    // register
    FIRST_NAME_REQUIRED: 'First name is required.',
    FIRST_NAME_MAX_LENGTH: `First name must be at most  ${USER_FIRST_NAME_MAX_LENGTH} characters.`,

    LAST_NAME_REQUIRED: 'Last name is required.',
    LAST_NAME_MAX_LENGTH: `Last name must be at most  ${USER_LAST_NAME_MAX_LENGTH} characters.`,

    EMAIL_REQUIRED: 'Email is required.',
    EMAIL_MUST_BE_VALID: 'Email must be a valid email.',
    EMAIL_MAX_LENGTH: `Email must be at most  ${USER_EMAIL_MAX_LENGTH} characters.`,

    PASSWORD_REQUIRED: 'Password is required.',
    PASSWORD_MIN_LENGTH: `Password must be at least ${USER_PASSWORD_MIN_LENGTH} characters.`,
    PASSWORD_MAX_LENGTH: `Password must be at most ${USER_PASSWORD_MAX_LENGTH_IN_DB} characters.`,
    PASSWORD_VALID_PATTERN:
      'Password must be at least 8 characters with at least 1 lowercase, 1 uppercase, 1 number and 1 special character.',

    PHONE_REQUIRED: 'Phone number is required.',
    PHONE_MAX_LENGTH: `Phone must be at most ${USER_PHONE_MAX_LENGTH} characters.`,
    PHONE_MIN_LENGTH: `Phone must be at least ${USER_PHONE_MIN_LENGTH} characters.`,

    DOB_REQUIRED: 'Date of birth is required.',
    DOB_CANNOT_BE_FUTURE_DATE: 'Date of birth cannot be future date.',
    DOB_CANNOT_BE_GREATER_THAN_FIRST_RELEASE_YEAR:
      'Date of birth should be smaller date than first release year.',

    GENDER_REQUIRED: 'Gender is required.',

    GENDER_OPTIONS: "Gender must be one of the following: 'm', 'f', 'o'.",

    ADDRESS_REQUIRED: 'Address is required.',
    ADDRESS_MAX_LENGTH: `Address must be at most ${USER_ADDRESS_MAX_LENGTH} characters.`,

    FIRST_RELEASE_YEAR_REQUIRED: 'First release year is required.',
    FIRST_RELEASE_YEAR_MIN_VALUE: `First release year cannot be less than ${ARTIST_MIN_RELEASE_YEAR}.`,
    FIRST_RELEASE_YEAR_CANNOT_BE_FUTURE_DATE:
      'First release year cannot be future date.',

    NUMBER_OF_ALBUMS_REQUIRED: 'Number of albums is required.',
    NUMBER_OF_ALBUMS_MIN_VALUE: `Number of albums cannot be less than ${ARTIST_MIN_ALBUM_NUMBER}.`,
  },
};

export default ArtistValidationMessage.EN;
