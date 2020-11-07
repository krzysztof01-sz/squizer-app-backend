// signing up

const INVALID_NICKNAME = 'Invalid nickname (3-15 characters)';
const INVALID_PASSWORD = 'Invalid password (8-15 characters)';
const DIFFERENT_PASSWORDS = 'Passwords are not the same';

const NICKNAME_RESERVED = 'The nickname is already in use by another account';
const REGISTRATION_ERROR = 'Error while creating a new user. Try again later';
const REGISTRATION_SUCCESS = 'Registred successfully';

const PHOTO_REQUIRED = 'Load the photo or choose a file with a right extension (jpg, jpeg or png)';
const INVALID_CSRF = 'Invalid CSRF token';

// logging

const LOGIN_INVALID_PASSWORD = 'Invalid password';
const LOGIN_INVALID_DATA = 'Invalid logging data';
const LOGIN_SUCCESS = 'Logged successfully';

// authentication

const JWT_ACCESS_DENIED = 'Invalid token. Access denied.';

module.exports = {
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  INVALID_NICKNAME,
  INVALID_PASSWORD,
  DIFFERENT_PASSWORDS,
  NICKNAME_RESERVED,
  PHOTO_REQUIRED,
  LOGIN_SUCCESS,
  INVALID_CSRF,
  LOGIN_INVALID_DATA,
  LOGIN_INVALID_PASSWORD,
  JWT_ACCESS_DENIED,
};
