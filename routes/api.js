const express = require('express');
const router = express.Router();
const verify = require('../middlewares/verifyToken');
const { quizzesController } = require('../controllers/quizzes');
const { usersController } = require('../controllers/users');
const { commentsController } = require('../controllers/comments');
const { check } = require('express-validator');
const { maxDescriptionLength } = require('../utils/constants');

router.get('/users', verify, usersController.getUsers);
router.put('/users', verify, usersController.updateUserAfterGame);
router.get('/users/:id', verify, usersController.getUser);
router.get('/users/:id/quizzes', verify, usersController.getUserQuizzes);
router.get('/users/:id/correct-answers-rate', verify, usersController.getUserCorrectAnswersRate);
router.put('/users/:id/set-avatar/:avatarType', verify, usersController.setUserAvatarType);
router.get('/account', verify, usersController.getProfileData);
router.get('/quizzes', verify, quizzesController.getAll);
router.get('/quizzes/:id', verify, quizzesController.getQuiz);
router.get('/quizzes/:id/questions', verify, quizzesController.getQuestions);
router.get('/quizzes/:id/comments', verify, quizzesController.getComments);
router.post(
  '/quizzes',
  [
    verify,
    check('title').trim().isLength({ min: 3, max: 100 }),
    check('description').trim().isLength({ min: 3, max: maxDescriptionLength }),
  ],
  quizzesController.addQuiz,
);

router.post(
  '/comments',
  [verify, check('content').trim().isLength({ min: 1, max: 500 })],
  commentsController.addComment,
);

module.exports = router;
