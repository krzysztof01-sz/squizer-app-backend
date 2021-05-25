const express = require("express");
const { check } = require("express-validator");
const messages = require("../utils/responseMessages");

const { csrfProtection } = require("../middlewares/csrf");
const { validateAvatar } = require("../utils/functions");
const { authController } = require("../controllers/auth");
const verify = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/login", authController.loginUser);
router.get("/refetch", verify, authController.refetchUser);
router.get("/logout", authController.logoutUser);
router.get("/csrf", csrfProtection, authController.getCsrf);

router.post(
  "/register",
  [
    check("nickname", messages.INVALID_NICKNAME).trim().isLength({ min: 3, max: 15 }),
    check("password", messages.INVALID_PASSWORD).trim().isLength({ min: 8, max: 50 }),
    check("confirmedPassword", messages.DIFFERENT_PASSWORDS)
      .exists()
      .trim()
      .custom((confirmedPassword, { req }) => confirmedPassword === req.body.password),
    check("avatar", messages.AVATAR_REQUIRED)
      .notEmpty()
      .custom((avatar) => validateAvatar(avatar)),
  ],
  authController.registerUser,
);

module.exports = router;
