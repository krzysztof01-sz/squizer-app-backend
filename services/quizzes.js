const Quiz = require("../models/Quiz");
const { QuizComment } = require("../models/QuizComment");
const { makeResponse, getArrayOf, validate } = require("../utils/functions");
const messages = require("../utils/responseMessages");
const responseTypes = require("../utils/responseTypes");
const { shuffleArray } = require("../utils/functions");

class QuizzesService {
  async getQuizzes() {
    try {
      const quizzes = await Quiz.find({}).sort({ creationDate: -1 });

      if (quizzes.length > 0) {
        return {
          type: responseTypes.success,
          data: quizzes,
        };
      } else throw messages.QUIZZES_NOT_FOUND;
    } catch (e) {
      return makeResponse(e, responseTypes.error);
    }
  }

  async getQuizQuestions(quizId) {
    try {
      const [{ questions }] = await Quiz.find({ _id: quizId }).select("questions");

      if (questions.length > 0) {
        questions.map((question) => shuffleArray(question.answers));
        return {
          type: responseTypes.success,
          data: questions,
        };
      } else throw messages.QUIZ_DOESNT_EXISTS;
    } catch (e) {
      if (typeof e === "object") e = messages.QUIZ_DOESNT_EXISTS;
      return makeResponse(e, responseTypes.error);
    }
  }

  async getQuizComments(quizId) {
    try {
      const [query] = (await Quiz.find({ _id: quizId }).select("comments")) || [];
      const comments = query.comments.sort((a, b) => (a.creationDate > b.creationDate ? -1 : 1));

      return {
        type: responseTypes.success,
        data: comments,
      };
    } catch (e) {
      return makeResponse(e, responseTypes.error);
    }
  }

  async getQuiz(quizId) {
    try {
      const [quiz] = await Quiz.find({ _id: quizId });
      if (!quiz._id) throw messages.QUIZ_DOESNT_EXISTS;

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
      if (!createdQuiz._id) throw messages.INVALID_QUIZ_DATA;

      return {
        type: responseTypes.success,
        msg: getArrayOf(makeResponse(`Quiz: ${createdQuiz.title} has created.`, "success")),
      };
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
        return makeResponse(messages.ADDING_COMMENT_VALIDATION_ERROR, responseTypes.error);
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

  async deleteQuizComment(quizId, commentId) {
    try {
      await Quiz.updateOne({ _id: quizId }, { $pull: { comments: { _id: commentId } } });

      return makeResponse(messages.DELETING_COMMENT_SUCCESS, responseTypes.success);
    } catch (e) {
      if (typeof e === "object") e = makeResponse(messages.DELETING_COMMENT_ERROR, responseTypes.error);
      return e;
    }
  }

  async updateQuizComment(req) {
    const { id: quizId, commentId } = req.params;
    const comment = req.body.content;

    try {
      const commentValidation = validate(req);

      if (!commentValidation.isEmpty()) {
        return makeResponse(messages.ADDING_COMMENT_VALIDATION_ERROR, responseTypes.error);
      }

      await Quiz.updateOne(
        { _id: quizId },
        { $set: { "comments.$[element].content": comment } },
        { arrayFilters: [{ "element._id": commentId }] },
      );

      return makeResponse(messages.UPDATING_COMMENT_SUCCESS, responseTypes.success);
    } catch (e) {
      if (typeof e === "object") e = makeResponse(messages.UPDATING_COMMENT_ERROR, responseTypes.error);
      return e;
    }
  }

  async sendQuizRating(quizId, data) {
    try {
      const { type, data: quiz } = await this.getQuiz(quizId);

      if (type === responseTypes.success) {
        const [userRating] = quiz.ratings.filter(({ userId }) => userId.toString() === data.userId.toString());
        if (userRating) {
          return makeResponse(`You have already rated this quiz (Your rating: ${userRating.rating}/5)`, responseTypes.error);
        }
      } else {
        return makeResponse(messages.RATING_ADDING_ERROR, responseTypes.error);
      }

      await Quiz.updateOne({ _id: quizId }, { $push: { ratings: data } });
      return makeResponse(messages.RATING_ADDING_SUCCESSFULLY, responseTypes.success);
    } catch (e) {
      if (typeof e === "object") e = makeResponse(messages.RATING_ADDING_ERROR, responseTypes.error);
      return e;
    }
  }
}

const Service = new QuizzesService();

module.exports = Service;
