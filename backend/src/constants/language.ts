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
    USER_CREATED: 'User is created successfully.',
    USER_DELETED: 'User is deleted successfully.',
    USER_UPDATED: 'User is updated successfully.',

    CANNOT_DELETE_YOURSELF: 'You cannot delete yourself.',

    // login
    INVALID_CREDENTIALS: 'Invalid credentials.',

    // artist
    ARTIST_CREATED: 'Artist is created successfully.',
    ARTIST_DELETED: 'Artist is deleted successfully.',
    ARTIST_UPDATED: 'Artist is updated successfully.',
    ARTIST_NOT_FOUND: 'Artist does not exist.',

    // uuid
    INVALID_UUID: 'Invalid UUID parameter.',

    // song
    SONG_CREATED: 'Song is created successfully.',
    SONG_DELETED: 'Song is deleted successfully.',
  },
};
const lang = process.env.SYSTEM_LANGUAGE || 'EN';

let Lang;

if (lang === 'EN') {
  Lang = responseMessages.EN;
}

export default Lang;
