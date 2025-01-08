const responseMessages = {
  EN: {
    // unauthorized
    UNAUTHORIZED: 'Unauthorized',

    // success
    SUCCESS: 'success',

    // something went wrong
    SOMETHING_WENT_WRONG: 'Something went wrong.',

    // email
    EMAIL_ALREADY_EXISTS: 'User with this email already exists.',
    EMAIL_NOT_EXIST: 'Email does not exist.',

    // user
    USER_REGISTERED: 'User is registered successfully.',
    USER_NOT_EXIST: 'User does not exist.',
    USER_CREATED: 'User is created successfully.',
    USER_DELETED: 'User is deleted successfully.',
    USER_UPDATED: 'User is updated successfully.',
    USER_NOT_AUTHENTICATED: 'User is not authenticated.',
    USER_ROLE_HAS_NO_PERMISSION: 'User role has no permissions assigned.',

    USER_DOES_NOT_HAVE_PERMISSION: 'User does not have required permissions.',

    NO_PERMISSION_FOR_THIS_ROUTE: 'No permissions defined for this route.',

    CANNOT_DELETE_YOURSELF: 'You cannot delete yourself.',

    // login
    INVALID_CREDENTIALS: 'Invalid credentials.',

    // artist
    ARTIST_CREATED: 'Artist is created successfully.',
    ARTIST_DELETED: 'Artist is deleted successfully.',
    ARTIST_UPDATED: 'Artist is updated successfully.',
    ARTIST_NOT_FOUND: 'Artist does not exist.',
    ARTIST_EXISTS: 'Artist already exists',

    // uuid
    INVALID_UUID: 'Invalid UUID parameter.',

    // song
    SONG_CREATED: 'Song is created successfully.',
    SONG_DELETED: 'Song is deleted successfully.',
    SONG_UPDATED: 'Song is updated successfully.',
    SONG_NOT_FOUND: 'Song does not exist.',
    NOT_OWNER_OF_RESOURCE: 'You are not owner of this resource.',
  },
};
const lang = process.env.SYSTEM_LANGUAGE || 'EN';

let Lang;

if (lang === 'EN') {
  Lang = responseMessages.EN;
}

export default Lang;
