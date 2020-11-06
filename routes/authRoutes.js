const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const messages = require('../utils/feedbackMessages');
const { loginController } = require('../controllers/authController');

router.post(
  '/login',
  [
    check('nickname', messages.INVALID_NICKNAME).trim().isLength({ min: 3, max: 15 }),
    check('password', messages.INVALID_PASSWORD).trim().isLength({ min: 8, max: 15 }),
  ],
  loginController,
);

module.exports = router;
