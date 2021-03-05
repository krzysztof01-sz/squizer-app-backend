const UsersService = require('../services/usersService');
const responseTypes = require('../utils/responseTypes');

module.exports.usersController = {
  getUser: async (req, res) => {
    if (req.user) {
      const response = await UsersService.getUser(req.params.id);

      const { type } = response;
      if (type === responseTypes.success) {
        const { user } = response;
        res.status(200).json({ type, user });
      } else {
        res.status(400).json({ type });
      }
    }
  },

  getUsers: async (req, res) => {
    if (req.user) {
      const userId = req.user._id.toString();
      const response = await UsersService.getUsers();
      const { type } = response;

      if (type === responseTypes.success) {
        let { users } = response;
        users = users.map(user => ({ ...user, isItMe: user._id.toString() === userId }));

        res.status(200).json({ type, users });
      } else {
        res.status(400).json({ type });
      }
    }
  },

  updateUserAfterGame: async (req, res) => {
    if (req.user) {
      const userId = req.user._id;
      const { quizId, stats } = req.body;
      const { type } = await UsersService.updateUserAfterGame(userId, quizId, stats);

      if (type === responseTypes.success) {
        res.status(200).json({ type });
      } else {
        res.status(400).json({ type });
      }
    }
  },

  getProfileData: async (req, res) => {
    if (req.user) {
      const { user } = req;
      const response = await UsersService.getProfileData(user._id);

      const { type } = response;
      if (type === responseTypes.success) {
        const { user } = response;
        res.status(200).json({ type, user });
      } else {
        const { msg } = response;
        res.status(400).json({ type, msg });
      }
    }
  },

  getUserQuizzes: async (req, res) => {
    if (req.user) {
      const { id: userId } = req.params;

      const response = await UsersService.getUserQuizzes(userId);

      const { type } = response;
      if (type === responseTypes.success) {
        const { quizzes } = response;
        res.status(200).json({ type, quizzes });
      } else {
        const { msg } = response;
        res.status(400).json({ type, msg });
      }
    }
  },

  setUserAvatarType: async (req, res) => {
    if (req.user) {
      const { id: userId, avatarType } = req.params;

      const { type } = await UsersService.setUserAvatarType(userId, avatarType);

      if (type === responseTypes.success) {
        res.status(200).json({ type });
      } else {
        res.status(400).json({ type });
      }
    }
  },
};
