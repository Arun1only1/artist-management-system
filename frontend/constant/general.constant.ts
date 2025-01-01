export const FIRST_NAME_MAX_LENGTH = 255;
export const LAST_NAME_MAX_LENGTH = 255;

export const EMAIL_MAX_LENGTH = 255;

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 50;

export const PHONE_MAX_LENGTH = 20;
export const PHONE_MIN_LENGTH = 10;

export const ADDRESS_MAX_LENGTH = 255;

// roles

export const genderOptions = [
  {
    id: 1,
    value: 'm',
    label: 'Male',
  },
  {
    id: 2,
    value: 'f',
    label: 'Female',
  },
  {
    id: 3,
    value: 'o',
    label: 'Other',
  },
];

export const roleOptions = [
  {
    id: 1,
    value: 'super_admin',
    label: 'Super Admin',
  },
  {
    id: 2,
    value: 'artist_manager',
    label: 'Artist manager',
  },
  {
    id: 3,
    value: 'artist',
    label: 'Artist',
  },
];
