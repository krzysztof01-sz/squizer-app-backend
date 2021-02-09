const UserService = require('../services/userService');
const responseTypes = require('../utils/responseTypes');

module.exports.usersController = {
  getUser: async (req, res) => {
    if (req.user) {
      const response = await UserService.getUser(req.params.id);
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
      const response = await UserService.getUsers();
      const { type } = response;

      if (type === responseTypes.success) {
        const { users } = response;
        res.status(200).json({ type, users });
      } else {
        res.status(400).json({ type });
      }
    }
  },

  updateUserAfterGame: async (req, res) => {
    if (req.user) {
      const userId = req.user._id;
      const { quizId, points } = req.body;
      const { type } = await UserService.updateUserAfterGame(userId, quizId, points);

      if (type === responseTypes.success) {
        res.status(200).json({ type });
      } else {
        res.status(400).json({ type });
      }
    }
  },
};
