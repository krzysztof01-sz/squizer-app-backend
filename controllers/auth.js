const AuthService = require('../services/authService');
const responseTypes = require('../utils/responseTypes');

module.exports.authController = {
  login: async (req, res) => {
    const response = await AuthService.Login(req);
    const { msg, type } = response;

    if (type === responseTypes.success) {
      const { token } = response;
      res.header('auth-token', token);
      res.status(200).json({ msg, type, token });
    } else {
      res.status(401).json({ msg, type });
    }
  },

  register: async (req, res) => {
    const response = await AuthService.SignUp(req);
    const { msg, type } = response;

    if (type === responseTypes.success) {
      const { userId } = response;
      res.status(201).json({ msg, type, userId });
    } else {
      res.status(400).json({ msg, type });
    }
  },

  getCsrf: (req, res) => {
    res.send({ csrfToken: req.csrfToken() });
  },
};
