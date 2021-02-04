const express = require('express');
const router = express.Router();
const verify = require('../middlewares/verifyToken');
const { quizzesController } = require('../controllers/quizzes');
const { usersController } = require('../controllers/users');
const { commentsController } = require('../controllers/comments');
const { check } = require('express-validator');
const { maxDescriptionLength } = require('../utils/constants');

router.get('/users/:id', verify, usersController.getUser);
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
