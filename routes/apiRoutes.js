const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const messages = require('../utils/responseMessages');
const { validatePhoto } = require('../utils/functions');
const { csrfProtection } = require('../middlewares/csrf');
const { addUserController } = require('../controllers/apiController');

router.post(
  '/adduser',
  [
    check('nickname', messages.INVALID_NICKNAME).trim().isLength({ min: 3, max: 15 }),
    check('password', messages.INVALID_PASSWORD).trim().isLength({ min: 8, max: 15 }),
    check('confirmedPassword', messages.DIFFERENT_PASSWORDS)
      .exists()
      .trim()
      .custom((confirmedPassword, { req }) => confirmedPassword === req.body.password),
    check('photo', messages.PHOTO_REQUIRED)
      .notEmpty()
      .custom(photo => validatePhoto(photo)),
  ],
  addUserController,
);

router.get('/getcsrf', csrfProtection, (req, res) => {
  res.send({ csrfToken: req.csrfToken() });
});

module.exports = router;
