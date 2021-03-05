const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    nickname: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    avatarType: {
      type: String,
      required: true,
      enum: ['custom', 'default'],
    },
    stats: {
      correctAnswers: {
        type: Number,
        default: 0,
      },
      givenAnswers: {
        type: Number,
        default: 0,
      },
    },
    visitedQuizzes: [mongoose.Schema.Types.ObjectId],
  },
  { collection: 'users', versionKey: false },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
