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
    photoType: {
      type: String,
      required: true,
      enum: ['custom', 'default'],
    },
  },
  { collection: 'users', versionKey: false },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
