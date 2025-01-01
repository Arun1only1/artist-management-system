const validationMessages = {
  EN: {
    // generic
    PROPERTY_REQUIRED: '$property is required.',
    MUST_BE_VALID_JWT_TOKEN: '$property must be valid JWT token.',
    MUST_BE_ASC_OR_DESC: '$property must be ASC or DESC.',
    MUST_BE_BOOLEAN: '$property must be true or false.',
    PROPERTY_MUST_BE_BOOLEAN: '$property mus be either true or false.',
    PROPERTY_CANNOT_BE_EMPTY_ARRAY: '$property cannot be an empty array.',
    PROPERTY_MUST_BE_AN_ARRAY: '$property must be an array.',
    MUST_BE_TRUE_OR_FALSE: '$property must be either true or false.',
    PROVIDE_VALID_MONGO_ID: '$property must be valid mongo id.',
    PROPERTY_MAX_LENGTH:
      '$property cannot be more than $constraint1 characters.',
    PROPERTY_MUST_BE_ARRAY: '$property must be an array.',
    ARRAY_MUST_CONTAIN_UNIQUE_VALUES:
      '$property array must contain unique values.',

    //   email
    PROVIDE_VALID_EMAIL: 'Please provide valid email.',

    //password
    PROVIDE_VALID_PASSWORD:
      'Password must be minimum 8 characters with 1 uppercase, 1 lowercase, 1 number and 1 special characters.',
    PASSWORD_REQUIRED: 'Password is required.',

    // first name and last name
    NAME_MAX_LENGTH: '$property cannot be longer than $constraint1 characters.',

    // gender
    PROVIDE_VALID_GENDER_VALUE:
      'Provide valid gender value which is either male or female or others.',
  },
};
const lang = process.env.SYSTEM_LANGUAGE || 'EN';

let MSG;

if (lang === 'EN') {
  MSG = validationMessages.EN;
}

export default MSG;
