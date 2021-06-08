const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { hashSync, compareSync } = require("bcrypt");
const messages = require("../utils/responseMessages");
const { makeResponse, getArrayOf, validate } = require("../utils/functions");
const responseTypes = require("../utils/responseTypes");

class Helper {
  async ifUserExists(nickname) {
    const usersWithThatNick = await User.find({ nickname });
    return usersWithThatNick.length > 0;
  }

  hashPassword(passwordToEncrypt) {
    return hashSync(passwordToEncrypt, 2);
  }
}

class Validator extends Helper {
  validateCSRF(req) {
    const clientToken = req.headers["csrf-token"];
    const serverToken = req.body._csrf;

    return clientToken === serverToken;
  }

  verifyPassword(password, hashedPassword) {
    return compareSync(password, hashedPassword);
  }
}

class AuthService extends Validator {
  async registerUser(req) {
    const credentials = req.body;

    try {
      const tokenValidation = this.validateCSRF(req);
      if (!tokenValidation) throw makeResponse(messages.INVALID_CSRF, responseTypes.error);

      const credentialsValidation = validate(req);
      if (!credentialsValidation.isEmpty()) throw credentialsValidation.array();

      const userExists = await this.ifUserExists(credentials.nickname);
      if (userExists) throw makeResponse(messages.NICKNAME_RESERVED, responseTypes.error);

      const newUserPassword = this.hashPassword(credentials.password);
      const user = new User({ ...credentials, password: newUserPassword });

      const createdUser = await user.save();
      if (!createdUser._id) throw makeResponse(messages.REGISTRATION_ERROR, responseTypes.error);

      const jwtToken = jwt.sign({ _id: createdUser._id }, process.env.JWT_SECRET);
      createdUser.password = undefined;

      return {
        type: responseTypes.success,
        msg: getArrayOf(makeResponse(messages.REGISTRATION_SUCCESS, responseTypes.success)),
        userId: user._id,
        token: jwtToken,
      };
    } catch (e) {
      return {
        type: responseTypes.error,
        msg: getArrayOf(e),
      };
    }
  }

  async loginUser(req) {
    const { nickname, password } = req.body;

    try {
      const tokenValidation = this.validateCSRF(req);
      if (!tokenValidation) throw makeResponse(messages.INVALID_CSRF, responseTypes.error);

      const user = await User.findOne({ nickname });
      if (!user) throw makeResponse(messages.LOGIN_INVALID_DATA, responseTypes.error);

      const comparingResult = this.verifyPassword(password, user.password);
      if (!comparingResult) throw makeResponse(messages.LOGIN_INVALID_PASSWORD, responseTypes.error);

      const jwtToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      user.password = undefined;

      return {
        type: responseTypes.success,
        msg: getArrayOf(makeResponse(messages.LOGIN_SUCCESS, responseTypes.success)),
        token: jwtToken,
        user,
      };
    } catch (e) {
      return {
        type: responseTypes.error,
        msg: getArrayOf(e),
      };
    }
  }

  async refetchUser(id) {
    const [user] = await User.find({ _id: id });

    if (user) {
      user.password = undefined;
    }

    return { data: user };
  }
}

const Service = new AuthService();

module.exports = Service;
