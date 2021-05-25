const User = require("../models/User");
const Quiz = require("../models/Quiz");
const responseTypes = require("../utils/responseTypes");
const messages = require("../utils/responseMessages");
const { makeResponse } = require("../utils/functions");

class UserService {
  async getUser(id) {
    try {
      const [searchedUser] = await User.find({ _id: id });
      if (searchedUser) {
        return {
          type: responseTypes.success,
          data: searchedUser,
        };
      } else throw { type: responseTypes.error };
    } catch (e) {
      return e;
    }
  }

  async getUsers() {
    try {
      const response = await User.find({}).sort({ "stats.correctAnswers": -1 });

      const users = response.map(({ _id, nickname, points, avatarType, stats }) => {
        return {
          _id,
          nickname,
          points,
          avatarType,
          stats,
        };
      });

      if (users.length > 0) {
        return {
          type: responseTypes.success,
          data: users,
        };
      } else throw makeResponse(messages.USERS_NOT_FOUND, responseTypes.error);
    } catch (e) {
      return e;
    }
  }

  async updateUserStatistics(userId, quizId, stats) {
    try {
      const [userToUpdate] = await User.find({ _id: userId });

      if (!userToUpdate._id) throw { type: responseTypes.error };

      if (!userToUpdate.visitedQuizzes.includes(quizId)) {
        await User.updateOne(
          { _id: userId },
          {
            $inc: {
              "stats.correctAnswers": stats.correctAnswers,
              "stats.givenAnswers": stats.givenAnswers,
            },
            $push: { visitedQuizzes: quizId },
          },
        );
      }

      const { type, data } = await this.getUser(userId);
      if (type === responseTypes.error) throw { type };

      return {
        type,
        data,
      };
    } catch (e) {
      return makeResponse(messages.UPDATING_USER_RESULT_ERROR, responseTypes.error);
    }
  }

  async getUserRankingPlace(userId) {
    try {
      const users = await User.find({}).sort({ "stats.correctAnswers": -1 });
      const userRankingPlace = users.findIndex((user) => user._id.toString() === userId) + 1;

      return {
        type: responseTypes.success,
        data: userRankingPlace,
      };
    } catch (e) {
      return e;
    }
  }

  async getUserQuizzes(userId) {
    try {
      const userQuizzes = (await Quiz.find({ createdBy: userId }).sort({ creationDate: -1 })) || [];

      return {
        type: responseTypes.success,
        data: userQuizzes,
      };
    } catch (e) {
      return e;
    }
  }

  async updateUserAvatarType(userId, avatarType) {
    try {
      const [userToUpdate] = await User.find({ _id: userId });
      if (!userToUpdate._id) throw makeResponse(messages.UPDATING_AVATAR_ERROR, responseTypes.error);

      await User.updateOne({ _id: userId }, { avatarType });
      return makeResponse(messages.UPDATING_AVATAR_SUCCESS, responseTypes.success);
    } catch (e) {
      if (typeof e === "object") e = makeResponse(messages.UPDATING_AVATAR_ERROR, responseTypes.error);
      return e;
    }
  }
}

const Service = new UserService();

module.exports = Service;
