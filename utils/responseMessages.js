const { maxDescriptionLength } = require('../utils/constants');

// signing up

const INVALID_NICKNAME = 'Invalid nickname (3-15 characters)';
const INVALID_PASSWORD = 'Invalid password (8-15 characters)';
const DIFFERENT_PASSWORDS = 'Passwords are not the same';

const NICKNAME_RESERVED = 'The nickname is already in use by another account';
const REGISTRATION_ERROR = 'Error while creating a new user. Try again later';
const REGISTRATION_SUCCESS = 'Registred successfully';

const AVATAR_REQUIRED = 'Load the avatar or choose a file with a right extension (jpg, jpeg or png)';
const INVALID_CSRF = 'Invalid CSRF token';

// logging

const LOGIN_INVALID_PASSWORD = 'Invalid password';
const LOGIN_INVALID_DATA = 'Invalid logging data';
const LOGIN_SUCCESS = 'Logged successfully';

// authentication

const JWT_ACCESS_DENIED = 'Invalid token. Access denied.';
const USER_NOT_AUTHENTICATED = 'You are not authenticated yet.';

// quizzes service
const QUIZZES_NOT_FOUND = `There are no quizzes yet `;
const QUIZ_DOESNT_EXISTS = 'This quiz probably does not exist.';
const INVALID_QUIZ_DATA = `Invalid quiz data, fill each of the fields.  TIP: title and description should be 3-${maxDescriptionLength} characters long`;

// comments service

const ADDING_COMMENT_ERROR = `The comment cannot be added, try again later.`;
const ADDING_COMMENT_SUCCESS = `The comment has been added successfully`;
const ADDING_COMMENT_VALIDATION_ERROR = `The comment must have maximum 500 characters.`;
const COMMENTS_NOT_FOUND = `Nobody comments this quiz yet.`;

// users service

const USERS_NOT_FOUND = 'User have not found';
const STATISTICS_NOT_FOUND = 'Cannot get statistics';

module.exports = {
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  INVALID_NICKNAME,
  INVALID_PASSWORD,
  DIFFERENT_PASSWORDS,
  NICKNAME_RESERVED,
  AVATAR_REQUIRED,
  LOGIN_SUCCESS,
  INVALID_CSRF,
  LOGIN_INVALID_DATA,
  LOGIN_INVALID_PASSWORD,
  JWT_ACCESS_DENIED,
  USER_NOT_AUTHENTICATED,
  QUIZZES_NOT_FOUND,
  QUIZ_DOESNT_EXISTS,
  INVALID_QUIZ_DATA,
  ADDING_COMMENT_ERROR,
  ADDING_COMMENT_SUCCESS,
  ADDING_COMMENT_VALIDATION_ERROR,
  COMMENTS_NOT_FOUND,
  USERS_NOT_FOUND,
  STATISTICS_NOT_FOUND,
};
