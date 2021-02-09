const User = require('../models/User');
const responseTypes = require('../utils/responseTypes');

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
      } else throw { type: responseTypes.error };
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
}

const Service = new UserService();

module.exports = Service;
