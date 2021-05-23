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
          user: searchedUser,
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

      return { type: responseTypes.success };
    } catch (e) {
      return e;
    }
  }

  async getProfileData(id) {
    try {
      const [profileData] = await User.find({ _id: id });
      const allUsers = await User.find({}).sort({ "stats.correctAnswers": -1 });
      const userRankingPlace = allUsers.findIndex((user) => user._id.toString() === id) + 1;

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
      if (typeof e === "object") e = makeResponse(messages.QUIZZES_FIND_ERROR, responseTypes.error);
      return e;
    }
  }

  async updateUserAvatarType(userId, avatarType) {
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
