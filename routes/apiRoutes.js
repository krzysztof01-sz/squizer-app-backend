const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const messages = require('../utils/responseMessages');
const { validatePhoto } = require('../utils/functions');
const { csrfProtection } = require('../middlewares/csrf');
const { addUserController } = require('../controllers/apiController');
const verify = require('../middlewares/verifyToken');
const Quiz = require('../models/Quiz');
const User = require('../models/User');

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

router.post('/quizzes', verify, async (req, res) => {
  if (req.user) {
    const quizzes = await Quiz.find({});
    res.send(quizzes);
  }
});

router.post('/users/:id', verify, async (req, res) => {
  if (req.user) {
    try {
      const [searchedUser] = await User.find({ _id: req.params.id });
      return res.send(searchedUser);
    } catch (err) {
      res.status(400).send(`Couldn't find user`);
    }
  }
});

module.exports = router;
