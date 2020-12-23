const Quiz = require('../models/Quiz');
const QuizQuestion = require('../models/QuizQuestion');
const { makeResponse, normalizeResponse } = require('../utils/functions');
const messages = require('../utils/responseMessages');
const responseTypes = require('../utils/responseTypes');

class QuizzesService {
  async getAllQuizzes() {
    try {
      const quizzes = await Quiz.find({});
      if (quizzes.length > 0) {
        return {
          type: responseTypes.success,
          quizzes,
        };
      } else throw messages.QUIZZES_FIND_ERROR;
    } catch (e) {
      return makeResponse(e, responseTypes.error);
    }
  }

  async getQuestions(quizId) {
    try {
      const [response] = await QuizQuestion.find({ quizId });
      const { questions } = response;
      if (questions.length > 0) {
        return {
          type: responseTypes.success,
          data: questions,
        };
      } else throw messages.QUIZ_DOESNT_EXISTS;
    } catch (e) {
      if (typeof e === 'object') e = messages.QUIZ_DOESNT_EXISTS;
      return makeResponse(e, responseTypes.error);
    }
  }

  async addQuiz(req) {
    const data = req.body;
    const { title, category, description, questions } = data;
    const quiz = { title, category, description, createdBy: req.user._id };

    try {
      const createdQuiz = await Quiz.create({ ...quiz });
      const createdQuestions = await QuizQuestion.create({ quizId: createdQuiz.id, questions });

      if (createdQuiz._id && createdQuestions._id) {
        return {
          type: responseTypes.success,
          msg: normalizeResponse(makeResponse(`Quiz: ${createdQuiz.title} has created.`, 'success')),
        };
      } else throw messages.INVALID_QUIZ_DATA;
    } catch (e) {
      if (typeof e === 'object') e = messages.INVALID_QUIZ_DATA;
      return {
        type: responseTypes.error,
        msg: normalizeResponse(makeResponse(e, responseTypes.error)),
      };
    }
  }
}

const Service = new QuizzesService();

module.exports = Service;
