const { maxDescriptionLength } = require("../utils/constants");

// signing up

const INVALID_NICKNAME = "Invalid nickname (3-15 characters)";
const INVALID_PASSWORD = "Invalid password (8-50 characters)";
const DIFFERENT_PASSWORDS = "Passwords are not the same";

const NICKNAME_RESERVED = "The nickname is already in use by another account";
const REGISTRATION_ERROR = "Error while creating a new user. Try again later";
const REGISTRATION_SUCCESS = "Registred successfully";

const AVATAR_REQUIRED = "Load the avatar or choose a file with a right extension (jpg, jpeg or png)";
const INVALID_CSRF = "Invalid CSRF token";

// logging

const LOGIN_INVALID_PASSWORD = "Invalid password";
const LOGIN_INVALID_DATA = "Invalid logging data";
const LOGIN_SUCCESS = "Logged successfully";
const LOGOUT = "User is logged out";

// authentication

const JWT_ACCESS_DENIED = "Invalid token. Login first.";

// quizzes service
const QUIZZES_NOT_FOUND = `Quizzes not found.`;
const QUIZ_DOESNT_EXISTS = "This quiz probably does not exist.";
const INVALID_QUIZ_DATA = `Invalid quiz data, fill each of the fields.  TIP: title and description should be 3-${maxDescriptionLength} characters long`;

const ADDING_COMMENT_ERROR = `The comment cannot be added, try again later.`;
const ADDING_COMMENT_SUCCESS = `The comment has been added successfully`;
const ADDING_COMMENT_VALIDATION_ERROR = `The comment must have from 1 to 500 characters.`;

// users service

const USERS_NOT_FOUND = "Users not found";
const STATISTICS_NOT_FOUND = "Cannot get statistics";
const DELETING_QUIZ_ERROR = "Deleting error occured.";
const DELETING_QUIZ_SUCCESS = "The quiz had been deleted successfully.";
const UPDATING_USER_RESULT_ERROR = `Your result cannot be updated. Try again later.`;
const UPDATING_AVATAR_ERROR = `Couldn't update an avatar. Try again later.`;
const UPDATING_AVATAR_SUCCESS = `Avatar has updated successfully!`;
const DELETING_COMMENT_SUCCESS = "Comment deleted successfully!";
const DELETING_COMMENT_ERROR = "Error while deleting the comment";
const UPDATING_COMMENT_SUCCESS = "Comment updated successfully!";
const UPDATING_COMMENT_ERROR = "Error while updating the comment";

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
  LOGOUT,
  JWT_ACCESS_DENIED,
  QUIZZES_NOT_FOUND,
  QUIZ_DOESNT_EXISTS,
  INVALID_QUIZ_DATA,
  ADDING_COMMENT_ERROR,
  ADDING_COMMENT_SUCCESS,
  ADDING_COMMENT_VALIDATION_ERROR,
  USERS_NOT_FOUND,
  STATISTICS_NOT_FOUND,
  DELETING_QUIZ_ERROR,
  DELETING_QUIZ_SUCCESS,
  UPDATING_USER_RESULT_ERROR,
  UPDATING_AVATAR_ERROR,
  UPDATING_AVATAR_SUCCESS,
  DELETING_COMMENT_SUCCESS,
  DELETING_COMMENT_ERROR,
  UPDATING_COMMENT_SUCCESS,
  UPDATING_COMMENT_ERROR,
};
