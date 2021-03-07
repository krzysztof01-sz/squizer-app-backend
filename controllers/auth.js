const AuthService = require('../services/authService');
const responseTypes = require('../utils/responseTypes');

module.exports.authController = {
  login: async (req, res) => {
    const response = await AuthService.login(req);
    const { msg, type } = response;

    if (type === responseTypes.success) {
      const { token } = response;
      res.cookie('token', token, { httpOnly: true, secure: process.env.ENV === 'production', sameSite: 'strict' });
      res.status(200).json({ msg, type });
    } else {
      res.status(401).json({ msg, type });
    }
  },

  register: async (req, res) => {
    const response = await AuthService.register(req);
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
