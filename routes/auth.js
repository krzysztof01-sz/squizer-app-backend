const express = require('express');
const { check } = require('express-validator');
const messages = require('../utils/responseMessages');

const { csrfProtection } = require('../middlewares/csrf');
const { validateAvatar } = require('../utils/functions');
const { authController } = require('../controllers/auth');

const router = express.Router();

router.post(
  '/login',
  [
    check('nickname', messages.INVALID_NICKNAME).trim().isLength({ min: 3, max: 15 }),
    check('password', messages.INVALID_PASSWORD).trim().isLength({ min: 8, max: 15 }),
  ],
  authController.login,
);

router.post(
  '/register',
  [
    check('nickname', messages.INVALID_NICKNAME).trim().isLength({ min: 3, max: 15 }),
    check('password', messages.INVALID_PASSWORD).trim().isLength({ min: 8, max: 15 }),
    check('confirmedPassword', messages.DIFFERENT_PASSWORDS)
      .exists()
      .trim()
      .custom((confirmedPassword, { req }) => confirmedPassword === req.body.password),
    check('avatar', messages.AVATAR_REQUIRED)
      .notEmpty()
      .custom(avatar => validateAvatar(avatar)),
  ],
  authController.register,
);

router.get('/csrf', csrfProtection, authController.getCsrf);

module.exports = router;
