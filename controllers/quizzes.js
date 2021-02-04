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
      const response = await QuizzesService.getQuestions(req.params.id);
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
      const response = await QuizzesService.getComments(req.params.id);

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
      const result = await QuizzesService.getQuiz(id);
      if (result.type === responseTypes.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    }
  },

  addQuiz: async (req, res) => {
    if (req.user) {
      const result = await QuizzesService.addQuiz(req);
      if (result.type === responseTypes.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    }
  },
};
