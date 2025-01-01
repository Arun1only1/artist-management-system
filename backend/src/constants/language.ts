const responseMessages = {
  EN: {
    // unauthorized
    UNAUTHORIZED: 'Unauthorized',

    // something went wrong
    SOMETHING_WENT_WRONG: 'Something went wrong.',

    // email
    EMAIL_ALREADY_EXISTS: 'User with this email already exists.',

    EMAIL_NOT_EXIST: 'Email does not exist.',

    // user
    USER_NOT_EXIST: 'User with the provided email does not exist.',

    USER_CREATED: 'User created successfully.',

    // login
    INVALID_CREDENTIALS: 'Invalid credentials.',

    // artist
    ARTIST_CREATED_SUCCESSFULLY: 'Artist is created successfully.',
  },
};
const lang = process.env.SYSTEM_LANGUAGE || 'EN';

let Lang;

if (lang === 'EN') {
  Lang = responseMessages.EN;
}

export default Lang;
