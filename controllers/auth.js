const AuthService = require("../services/auth");
const responseTypes = require("../utils/responseTypes");

module.exports.authController = {
  loginUser: async (req, res) => {
    const { type, msg, token, user } = await AuthService.loginUser(req);

    if (type === responseTypes.success) {
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.ENV === "production",
        expires: new Date(Date.now() + 24 * 3600 * 1000),
      });

      res.status(200).json({ type, msg, user });
    } else {
      res.status(401).json({ type, msg });
    }
  },

  registerUser: async (req, res) => {
    const { type, msg, userId, token } = await AuthService.registerUser(req);

    if (type === responseTypes.success) {
      // autologging after successful registration
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.ENV === "production",
        expires: new Date(Date.now() + 24 * 3600 * 1000),
      });

      res.status(201).json({ type, msg, userId });
    } else {
      res.status(400).json({ type, msg });
    }
  },

  logoutUser: async (_, res) => {
    res.cookie("token", "logout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
<<<<<<< HEAD
      sameSite: "none",
      secure: process.env.ENV === "production",
=======
      sameSite: "strict",
>>>>>>> 90a5d043ca41859db2469e6ba2d2c0cbc48e0c74
    });
    res.status(200).json({ success: true });
  },

  refetchUser: async (req, res) => {
    if (req.user) {
      const { data } = await AuthService.refetchUser(req.user._id);

      res.status(200).json({ data });
    } else {
      res.status(400).json({ data: null });
    }
  },

  getCsrf: (req, res) => {
    res.json({ type: responseTypes.success, data: req.csrfToken() });
  },
};
