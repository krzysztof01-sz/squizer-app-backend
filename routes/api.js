const express = require('express');
const router = express.Router();
const verify = require('../middlewares/verifyToken');
const { quizzesController } = require('../controllers/quizzes');
const { usersController } = require('../controllers/users');

router.get('/users/:id', verify, usersController.getUser);
router.get('/quizzes', verify, quizzesController.getAll);
router.get('/quizzes/:id/questions', verify, quizzesController.getQuestions);
router.post('/quizzes', verify, quizzesController.addQuiz);

module.exports = router;
