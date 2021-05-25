const UsersService = require("../services/users");
const responseTypes = require("../utils/responseTypes");

module.exports.usersController = {
  getUser: async (req, res) => {
    if (req.user) {
      const { type, data } = await UsersService.getUser(req.params.id);

      if (type === responseTypes.success) {
        res.status(200).json({ type, data });
      } else {
        res.status(400).json({ type });
      }
    }
  },

  getUsers: async (req, res) => {
    if (req.user) {
      const { type, data, msg } = await UsersService.getUsers();

      if (type === responseTypes.success) {
        res.status(200).json({ type, data });
      } else {
        res.status(400).json({ type, msg });
      }
    }
  },

  updateUserStatistics: async (req, res) => {
    if (req.user) {
      const userId = req.user._id;
      const { quizId, stats } = req.body;
      const { type, data, msg } = await UsersService.updateUserStatistics(userId, quizId, stats);

      if (type === responseTypes.success) {
        res.status(200).json({ type, data });
      } else {
        res.status(400).json({ type, msg });
      }
    }
  },

  getUserRankingPlace: async (req, res) => {
    if (req.user) {
      const { type, data, msg } = await UsersService.getUserRankingPlace(req.user._id);

      if (type === responseTypes.success) {
        res.status(200).json({ type, data });
      } else {
        res.status(400).json({ type, msg });
      }
    }
  },

  getUserQuizzes: async (req, res) => {
    if (req.user) {
      const userId = req.params.id;
      const { type, data, msg } = await UsersService.getUserQuizzes(userId);

      if (type === responseTypes.success) {
        res.status(200).json({ type, data });
      } else {
        res.status(400).json({ type, msg });
      }
    }
  },

  updateUserAvatarType: async (req, res) => {
    if (req.user) {
      const { id: userId, type: avatarType } = req.params;
      const { type, msg } = await UsersService.updateUserAvatarType(userId, avatarType);

      if (type === responseTypes.success) {
        res.status(200).json({ type, msg });
      } else {
        res.status(400).json({ type, msg });
      }
    }
  },
};
