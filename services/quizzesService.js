const Quiz = require('../models/Quiz');
const { QuizComment } = require('../models/QuizComment');
const QuizQuestion = require('../models/QuizQuestion');
const { makeResponse, getArrayOf, validate } = require('../utils/functions');
const messages = require('../utils/responseMessages');
const responseTypes = require('../utils/responseTypes');

class QuizzesService {
  async getAllQuizzes() {
    try {
      const quizzes = await Quiz.find({}).sort({ creationDate: -1 });
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
          questions,
          type: responseTypes.success,
        };
      } else throw messages.QUIZ_DOESNT_EXISTS;
    } catch (e) {
      if (typeof e === 'object') e = messages.QUIZ_DOESNT_EXISTS;
      return makeResponse(e, responseTypes.error);
    }
  }

  async getComments(quizId) {
    try {
      const comments = await QuizComment.find({ quizId }).sort({ creationDate: -1 });
      return {
        comments,
        type: responseTypes.success,
      };
    } catch (e) {
      if (typeof e === 'object') e = messages.COMMENTS_NOT_FOUND;
      return makeResponse(e, responseTypes.error);
    }
  }

  async getQuiz(quizId) {
    try {
      const [quiz] = await Quiz.find({ _id: quizId });
      if (!quiz) throw messages.QUIZ_DOESNT_EXISTS;
      return {
        type: responseTypes.success,
        data: quiz,
      };
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
      const validationResult = validate(req);
      if (!validationResult.isEmpty()) throw validationResult.array();

      const createdQuiz = await Quiz.create({ ...quiz });
      const createdQuestions = await QuizQuestion.create({ quizId: createdQuiz.id, questions });

      if (createdQuiz._id && createdQuestions._id) {
        return {
          type: responseTypes.success,
          msg: getArrayOf(makeResponse(`Quiz: ${createdQuiz.title} has created.`, 'success')),
        };
      } else throw messages.INVALID_QUIZ_DATA;
    } catch (e) {
      if (typeof e === 'object') e = messages.INVALID_QUIZ_DATA;
      return {
        type: responseTypes.error,
        msg: getArrayOf(makeResponse(e, responseTypes.error)),
      };
    }
  }
}

const Service = new QuizzesService();

module.exports = Service;
