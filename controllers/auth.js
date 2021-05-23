const AuthService = require("../services/authService");
const responseTypes = require("../utils/responseTypes");

module.exports.authController = {
  login: async (req, res) => {
    const response = await AuthService.login(req);
    const { msg, type } = response;

    if (type === responseTypes.success) {
      const { token, user } = response;
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.ENV === "production",
        expires: new Date(Date.now() + 24 * 3600 * 1000),
      });
      res.status(200).json({ msg, type, user });
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

  logout: async (_, res) => {
    res.cookie("token", "logout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ success: true });
  },

  refetch: async (req, res) => {
    if (req.user) {
      const user = await AuthService.findUser(req.user._id);
      res.status(200).json({ user });
    } else {
      res.status(400).json({ user: null });
    }
  },

  getCsrf: (req, res) => {
    res.send({ csrfToken: req.csrfToken() });
  },
};
