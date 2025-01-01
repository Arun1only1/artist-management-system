import {
  ADDRESS_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PHONE_MAX_LENGTH,
  PHONE_MIN_LENGTH,
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

    GENDER_REQUIRED: 'Gender is required.',

    GENDER_OPTIONS: "Gender must be one of the following: 'm', 'f', 'o'.",

    ADDRESS_REQUIRED: 'Address is required.',
    ADDRESS_MAX_LENGTH: `Address must be at most ${ADDRESS_MAX_LENGTH} characters.`,
  },
};

export default MSG.EN;
