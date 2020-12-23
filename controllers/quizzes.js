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
        const { data } = response;
        res.status(200).json({ type, questions: data });
      } else {
        const { msg } = response;
        res.status(401).json({ type, msg });
      }
    }
  },

  addQuiz: async (req, res) => {
    if (req.user) {
      const result = await QuizzesService.addQuiz(req);
      if (result.type === responseTypes.success) {
        res.status(200).json(result);
      } else {
        res.status(401).json(result);
      }
    }
  },
};
