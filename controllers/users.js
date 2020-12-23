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
        res.status(401).json({ type });
      }
    }
  },
};
