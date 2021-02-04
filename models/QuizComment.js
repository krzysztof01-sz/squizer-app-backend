const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quizCommentSchema = new Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
    },
    content: {
      type: String,
      required: true,
    },
  },
  { collection: 'quiz_comments', timestamps: { createdAt: 'creationDate' }, versionKey: false },
);

const QuizComment = mongoose.model('Comment', quizCommentSchema);

module.exports = { QuizComment, quizCommentSchema };
