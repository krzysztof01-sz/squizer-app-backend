const QuizzesService = require('../services/quizzesService');
const responseTypes = require('../utils/responseTypes');

module.exports.quizzesController = {
  getAll: async (req, res) => {
    if (req.user) {
      const response = await QuizzesService.getAllQuizzes();
      const { type } = response;
      if (type === responseTypes.success) {
        const { quizzes } = response;
        res.status(200).json({ type, quizzes });
      } else {
        const { msg } = response;
        res.status(401).json({ type, msg });
      }
    }
  },

  getQuestions: async (req, res) => {
    if (req.user) {
      const quizId = req.params.id;
      const response = await QuizzesService.getQuestions(quizId);

      const { type } = response;
      if (type === responseTypes.success) {
        const { questions } = response;
        res.status(200).json({ type, questions });
      } else {
        const { msg } = response;
        res.status(400).json({ type, msg });
      }
    }
  },

  getComments: async (req, res) => {
    if (req.user) {
      const quizId = req.params.id;
      const response = await QuizzesService.getComments(quizId);

      const { type } = response;
      if (type === responseTypes.success) {
        const { comments } = response;
        res.status(200).json({ type, comments });
      } else {
        const { msg } = response;
        res.status(400).json({ type, msg });
      }
    }
  },

  getQuiz: async (req, res) => {
    if (req.user) {
      const id = req.params.id;
      const actionResult = await QuizzesService.getQuiz(id);

      if (actionResult.type === responseTypes.success) {
        res.status(201).json(actionResult);
      } else {
        res.status(400).json(actionResult);
      }
    }
  },

  addQuiz: async (req, res) => {
    if (req.user) {
      const actionResult = await QuizzesService.addQuiz(req);

      if (actionResult.type === responseTypes.success) {
        res.status(201).json(actionResult);
      } else {
        res.status(400).json(actionResult);
      }
    }
  },

  addComment: async (req, res) => {
    if (req.user) {
      const { type, msg } = await QuizzesService.addComment(req);

      if (type === responseTypes.success) {
        res.status(201).json({ msg, type });
      } else {
        res.status(401).json({ msg, type });
      }
    }
  },
};
