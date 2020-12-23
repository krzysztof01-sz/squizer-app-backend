const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { hashSync, compareSync } = require('bcrypt');
const { validationResult } = require('express-validator');
const messages = require('../utils/responseMessages');
const { makeResponse, normalizeResponse } = require('../utils/functions');
const responseTypes = require('../utils/responseTypes');

class Helper {
  async ifUserExists(nickname) {
    const usersWithThatNick = await User.find({ nickname });
    return usersWithThatNick.length > 0 ? true : false;
  }

  hashPassword(passwordToEncrypt) {
    return hashSync(passwordToEncrypt, 2);
  }
}

class Validator extends Helper {
  validate(req) {
    return validationResult(req).formatWith(({ msg }) => {
      return { msg, type: responseTypes.error };
    });
  }

  validateCSRF(req) {
    const clientToken = req.headers['csrf-token'];
    const serverToken = req.body._csrf;

    return clientToken === serverToken ? true : false;
  }

  verifyPassword(password, hashedPassword) {
    return compareSync(password, hashedPassword);
  }
}

class AuthService extends Validator {
  async SignUp(req) {
    const credentials = req.body;

    try {
      const tokenValidation = this.validateCSRF(req);
      if (!tokenValidation) throw makeResponse(messages.INVALID_CSRF, responseTypes.error);

      const credentialsValidation = this.validate(req);
      if (!credentialsValidation.isEmpty()) throw credentialsValidation.array();

      const userExists = await this.ifUserExists(credentials.nickname);
      if (userExists) throw makeResponse(messages.NICKNAME_RESERVED, responseTypes.error);

      const newUserPassword = this.hashPassword(credentials.password);
      const user = new User({ ...credentials, password: newUserPassword });

      const response = await user.save();
      if (!response._id) throw makeResponse(messages.REGISTRATION_ERROR, responseTypes.error);

      return {
        type: responseTypes.success,
        msg: normalizeResponse(makeResponse(messages.REGISTRATION_SUCCESS, responseTypes.success)),
        userId: user._id,
      };
    } catch (e) {
      return {
        type: responseTypes.error,
        msg: normalizeResponse(e),
      };
    }
  }

  async Login(req) {
    const { nickname, password } = req.body;

    try {
      const tokenValidation = this.validateCSRF(req);
      if (!tokenValidation) throw makeResponse(messages.INVALID_CSRF, responseTypes.error);

      const credentialsValidation = this.validate(req);
      if (!credentialsValidation.isEmpty()) throw credentialsValidation.array();

      const user = await User.findOne({ nickname });
      if (!user) throw makeResponse(messages.LOGIN_INVALID_DATA, responseTypes.error);

      const comparingResult = this.verifyPassword(password, user.password);
      if (!comparingResult) throw makeResponse(messages.LOGIN_INVALID_PASSWORD, responseTypes.error);

      const jwtToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      return {
        type: responseTypes.success,
        msg: normalizeResponse(makeResponse(messages.LOGIN_SUCCESS, responseTypes.success)),
        token: jwtToken,
      };
    } catch (e) {
      return {
        type: responseTypes.error,
        msg: normalizeResponse(e),
      };
    }
  }
}

const Service = new AuthService();

module.exports = Service;
