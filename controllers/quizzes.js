const QuizzesService = require("../services/quizzes");
const responseTypes = require("../utils/responseTypes");

module.exports.quizzesController = {
  getQuizzes: async (req, res) => {
    if (req.user) {
      const { type, data, msg } = await QuizzesService.getQuizzes();

      if (type === responseTypes.success) {
        res.status(200).json({ type, data });
      } else {
        res.status(401).json({ type, msg });
      }
    }
  },

  getQuizQuestions: async (req, res) => {
    if (req.user) {
      const quizId = req.params.id;
      const { type, data, msg } = await QuizzesService.getQuizQuestions(quizId);

      if (type === responseTypes.success) {
        res.status(200).json({ type, data });
      } else {
        res.status(400).json({ type, msg });
      }
    }
  },

  getQuizComments: async (req, res) => {
    if (req.user) {
      const quizId = req.params.id;
      const { type, data, msg } = await QuizzesService.getQuizComments(quizId);

      if (type === responseTypes.success) {
        res.status(200).json({ type, data });
      } else {
        res.status(400).json({ type, msg });
      }
    }
  },

  getQuiz: async (req, res) => {
    if (req.user) {
      const id = req.params.id;
      const { type, data, msg } = await QuizzesService.getQuiz(id);

      if (type === responseTypes.success) {
        res.status(201).json({ type, data });
      } else {
        res.status(400).json({ type, msg });
      }
    }
  },

  addQuiz: async (req, res) => {
    if (req.user) {
      const { type, msg } = await QuizzesService.addQuiz(req);

      if (type === responseTypes.success) {
        res.status(201).json({ type, msg });
      } else {
        res.status(400).json({ type, msg });
      }
    }
  },

  addComment: async (req, res) => {
    if (req.user) {
      const { type, msg } = await QuizzesService.addComment(req);

      if (type === responseTypes.success) {
        res.status(201).json({ type, msg });
      } else {
        res.status(401).json({ type, msg });
      }
    }
  },

  deleteQuiz: async (req, res) => {
    if (req.user) {
      const quizId = req.params.id;
      const { type, msg } = await QuizzesService.deleteQuiz(quizId);

      if (type === responseTypes.success) {
        res.status(200).json({ type, msg });
      } else {
        res.status(500).json({ type, msg });
      }
    }
  },
};
