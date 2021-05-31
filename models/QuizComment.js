const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "creationDate" } },
);

const QuizComment = mongoose.model("Comment", commentSchema);

module.exports = { QuizComment, commentSchema };
