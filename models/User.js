const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { hashSync, compareSync } = require('bcrypt');
const { getRandomNumber } = require('../utils/functions');
const messages = require('../utils/feedbackMessages');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
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

userSchema.statics.addUser = async function (credentials) {
  const exists = await this.ifUserExists(credentials.nickname);

  if (exists) {
    throw [{ msg: messages.NICKNAME_RESERVED, param: getRandomNumber(), type: 'error' }];
  } else {
    const newUserPassword = this.hashPassword(credentials.password);
    const user = new User({ ...credentials, password: newUserPassword });

    try {
      await user.save();
      return [
        {
          msg: messages.REGISTRATION_SUCCESS,
          param: getRandomNumber(),
          type: 'success',
          id: user._id,
          nick: user.nickname,
        },
      ];
    } catch (err) {
      throw [{ msg: messages.REGISTRATION_ERROR, param: getRandomNumber(), type: 'error' }];
    }
  }
};

userSchema.statics.loginUser = async function ({ nickname, password }) {
  const user = await User.findOne({ nickname });

  if (!user) throw [{ msg: messages.LOGIN_INVALID_DATA, param: getRandomNumber(), type: 'error' }];

  const comparingResult = this.verifyPassword(password, user.password);

  if (comparingResult) {
    const jwtToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return [{ msg: messages.LOGIN_SUCCESS, param: getRandomNumber(), type: 'success', token: jwtToken }];
  } else {
    throw [{ msg: messages.LOGIN_INVALID_PASSWORD, param: getRandomNumber(), type: 'error' }];
  }
};

userSchema.statics.ifUserExists = async function (nickname) {
  const usersWithThatNick = await this.find({ nickname });
  return usersWithThatNick.length > 0 ? true : false;
};

userSchema.statics.hashPassword = passwordToEncrypt => hashSync(passwordToEncrypt, 2);
userSchema.statics.verifyPassword = (password, hashedPassword) => compareSync(password, hashedPassword);

const User = mongoose.model('User', userSchema);

module.exports = User;
