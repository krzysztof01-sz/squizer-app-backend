const express = require('express');
const { check } = require('express-validator');
const verify = require('../middlewares/verifyToken');
const { quizzesController } = require('../controllers/quizzes');
const { usersController } = require('../controllers/users');
const { maxDescriptionLength } = require('../utils/constants');

const router = express.Router();

router.get('/users', verify, usersController.getUsers);
router.put('/users', verify, usersController.updateUserAfterGame);

router.get('/users/:id', verify, usersController.getUser);
router.get('/users/:id/quizzes', verify, usersController.getUserQuizzes);
router.put('/users/:id/set-avatar/:avatarType', verify, usersController.setUserAvatarType);

router.get('/quizzes', verify, quizzesController.getAll);
router.get('/quizzes/:id', verify, quizzesController.getQuiz);
router.get('/quizzes/:id/questions', verify, quizzesController.getQuestions);
router.get('/quizzes/:id/comments', verify, quizzesController.getComments);
router.delete('/quizzes/:id', verify, quizzesController.deleteQuiz);

router.get('/account', verify, usersController.getProfileData);

router.put(
  '/quizzes/:id/comments',
  [verify, check('content').trim().isLength({ min: 1, max: 500 })],
  quizzesController.addComment,
);

router.post(
  '/quizzes',
  [
    verify,
    check('title').trim().isLength({ min: 3, max: 100 }),
    check('description').trim().isLength({ min: 3, max: maxDescriptionLength }),
  ],
  quizzesController.addQuiz,
);

module.exports = router;
