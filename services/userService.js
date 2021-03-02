const User = require('../models/User');
const responseTypes = require('../utils/responseTypes');
const messages = require('../utils/responseMessages');
const { makeResponse } = require('../utils/functions');
const Quiz = require('../models/Quiz');
const QuizQuestion = require('../models/QuizQuestion');

class UserService {
  async getUser(id) {
    try {
      const [searchedUser] = await User.find({ _id: id });
      if (searchedUser) {
        return {
          type: responseTypes.success,
          user: searchedUser,
        };
      } else throw { type: responseTypes.error };
    } catch (e) {
      return e;
    }
  }

  async getUsers() {
    try {
      const response = await User.find({}).sort({ points: -1 });

      const users = response.map(({ _id, nickname, points, avatarType }) => {
        return {
          _id,
          nickname,
          points,
          avatarType,
        };
      });
      if (users) {
        return {
          type: responseTypes.success,
          users,
        };
      } else throw makeResponse(messages.USERS_NOT_FOUND, responseTypes.error);
    } catch (e) {
      return e;
    }
  }

  async updateUserAfterGame(userId, quizId, points) {
    try {
      const [userToUpdate] = await User.find({ _id: userId });

      if (!userToUpdate._id) throw { type: responseTypes.error };

      if (!userToUpdate.visitedQuizzes.includes(quizId)) {
        await User.updateOne({ _id: userId }, { $inc: { points }, $push: { visitedQuizzes: quizId } });
      }

      return { type: responseTypes.success };
    } catch (e) {
      return e;
    }
  }

  async getProfileData(id) {
    try {
      const [profileData] = await User.find({ _id: id });
      const allUsers = await User.find({}).sort({ points: -1 });

      const userRankingPlace = allUsers.findIndex(user => user._id.toString() === id) + 1;

      profileData._doc.rankingPlace = userRankingPlace;
      profileData.password = null;

      if (profileData._id) {
        return { user: profileData, type: responseTypes.success };
      } else throw makeResponse(messages.USER_NOT_AUTHENTICATED, responseTypes.error);
    } catch (e) {
      return e;
    }
  }

  async getUserQuizzes(userId) {
    try {
      const userQuizzes = (await Quiz.find({ createdBy: userId })) || [];

      return {
        type: responseTypes.success,
        quizzes: userQuizzes,
      };
    } catch (e) {
      if (typeof e === 'object') e = makeResponse(messages.QUIZZES_FIND_ERROR, responseTypes.error);
      return e;
    }
  }

  async getUserCorrectAnswersRate(userId) {
    try {
      const [user] = await User.find({ _id: userId });
      const visitedQuizzes = await QuizQuestion.find({ quizId: { $in: user.visitedQuizzes } });

      if (user._id && visitedQuizzes) {
        const quizzesQuestions = visitedQuizzes.map(quiz => quiz.questions);
        const questionsQuantity = quizzesQuestions.reduce((prev, curr) => prev + curr.length, 0);
        const correctAnswersRate = +((user.points / questionsQuantity) * 100).toFixed(2);

        return {
          type: responseTypes.success,
          correctAnswersRate: correctAnswersRate || 0,
        };
      } else throw makeResponse(messages.STATISTICS_NOT_FOUND, responseTypes.error);
    } catch (e) {
      return e;
    }
  }

  async setUserAvatarType(userId, avatarType) {
    try {
      const [userToUpdate] = await User.find({ _id: userId });
      if (!userToUpdate._id) throw { type: responseTypes.error };

      await User.updateOne({ _id: userId }, { avatarType });
      return { type: responseTypes.success };
    } catch (e) {
      return e;
    }
  }
}

const Service = new UserService();

module.exports = Service;
