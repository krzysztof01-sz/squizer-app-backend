const express = require("express");
const { check } = require("express-validator");
const verify = require("../middlewares/verifyToken");
const { quizzesController } = require("../controllers/quizzes");
const { usersController } = require("../controllers/users");
const { maxDescriptionLength } = require("../utils/constants");

const router = express.Router();

router.get("/users", verify, usersController.getUsers);
router.get("/users/:id", verify, usersController.getUser);
router.put("/users", verify, usersController.updateUserStatistics);
router.get("/users/:id/quizzes", verify, usersController.getUserQuizzes);
router.put("/users/:id/update-avatar/:type", verify, usersController.updateUserAvatarType);
router.get("/users/:id/ranking-place", verify, usersController.getUserRankingPlace);

router.get("/quizzes", verify, quizzesController.getQuizzes);
router.get("/quizzes/:id", verify, quizzesController.getQuiz);
router.get("/quizzes/:id/questions", verify, quizzesController.getQuizQuestions);
router.get("/quizzes/:id/comments", verify, quizzesController.getQuizComments);
router.delete("/quizzes/:id", verify, quizzesController.deleteQuiz);
router.delete("/quizzes/:id/comments/:commentId", verify, quizzesController.deleteQuizComment);
router.post("/quizzes/:id/ratings", verify, quizzesController.sendQuizRating);
router.put(
  "/quizzes/:id/comments/:commentId",
  [verify, check("content").trim().isLength({ min: 1, max: 500 })],
  quizzesController.updateQuizComment,
);

router.post(
  "/quizzes/:id/comments",
  [verify, check("content").trim().isLength({ min: 1, max: 500 })],
  quizzesController.addComment,
);

router.post(
  "/quizzes",
  [
    verify,
    check("title").trim().isLength({ min: 3, max: 100 }),
    check("description").trim().isLength({ min: 3, max: maxDescriptionLength }),
  ],
  quizzesController.addQuiz,
);

module.exports = router;
