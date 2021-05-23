const Quiz = require("../models/Quiz");
const { QuizComment } = require("../models/QuizComment");
const { makeResponse, getArrayOf, validate } = require("../utils/functions");
const messages = require("../utils/responseMessages");
const responseTypes = require("../utils/responseTypes");

class QuizzesService {
  async getAllQuizzes() {
    try {
      const quizzes = await Quiz.find({}).sort({ creationDate: -1 });
      if (quizzes.length > 0) {
        return {
          type: responseTypes.success,
          quizzes,
        };
      } else throw messages.QUIZZES_NOT_FOUND;
    } catch (e) {
      return makeResponse(e, responseTypes.error);
    }
  }

  async getQuestions(quizId) {
    try {
      const [query] = await Quiz.find({ _id: quizId }).select("questions");
      const { questions } = query;

      if (questions.length > 0) {
        return {
          questions,
          type: responseTypes.success,
        };
      } else throw messages.QUIZ_DOESNT_EXISTS;
    } catch (e) {
      if (typeof e === "object") e = messages.QUIZ_DOESNT_EXISTS;
      return makeResponse(e, responseTypes.error);
    }
  }

  async getComments(quizId) {
    try {
      const [query] = await Quiz.find({ _id: quizId }).select("comments");
      const sortedComments = query.comments.sort((a, b) => (a.creationDate > b.creationDate ? -1 : 1));

      return {
        comments: sortedComments,
        type: responseTypes.success,
      };
    } catch (e) {
      if (typeof e === "object") e = messages.COMMENTS_NOT_FOUND;
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
      if (typeof e === "object") e = messages.QUIZ_DOESNT_EXISTS;
      return makeResponse(e, responseTypes.error);
    }
  }

  async addQuiz(req) {
    const data = req.body;
    const { title, category, description, questions } = data;
    const quiz = { title, category, description, createdBy: req.user._id, questions, comments: [] };

    try {
      const validationResult = validate(req);
      if (!validationResult.isEmpty()) throw validationResult.array();

      const createdQuiz = await Quiz.create({ ...quiz });

      if (createdQuiz._id) {
        return {
          type: responseTypes.success,
          msg: getArrayOf(makeResponse(`Quiz: ${createdQuiz.title} has created.`, "success")),
        };
      } else {
        throw messages.INVALID_QUIZ_DATA;
      }
    } catch (e) {
      if (typeof e === "object") e = messages.INVALID_QUIZ_DATA;

      return {
        type: responseTypes.error,
        msg: getArrayOf(makeResponse(e, responseTypes.error)),
      };
    }
  }

  async addComment(req) {
    const quizId = req.params.id;
    const authorId = req.user._id;

    try {
      const commentValidation = validate(req);

      if (!commentValidation.isEmpty()) {
        throw makeResponse(messages.ADDING_COMMENT_VALIDATION_ERROR, responseTypes.error);
      }

      const comment = new QuizComment({ ...req.body, authorId });
      await Quiz.updateOne({ _id: quizId }, { $push: { comments: comment } });

      return makeResponse(messages.ADDING_COMMENT_SUCCESS, responseTypes.success);
    } catch (e) {
      if (typeof e === "object") e = makeResponse(messages.ADDING_COMMENT_ERROR, responseTypes.error);
      return e;
    }
  }

  async deleteQuiz(quizId) {
    try {
      await Quiz.deleteOne({ _id: quizId });
      return makeResponse(messages.DELETING_QUIZ_SUCCESS, responseTypes.success);
    } catch (e) {
      if (typeof e === "object") e = makeResponse(messages.DELETING_QUIZ_ERROR, responseTypes.error);
      return e;
    }
  }
}

const Service = new QuizzesService();

module.exports = Service;
