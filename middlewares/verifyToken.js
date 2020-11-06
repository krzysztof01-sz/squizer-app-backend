const jwt = require('jsonwebtoken');
const { getRandomNumber } = require('../utils/functions');
const messages = require('../utils/feedbackMessages');

const verify = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) res.status(400).send([{ msg: messages.JWT_ACCESS_DENIED, param: getRandomNumber(), type: 'error' }]);
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } catch (err) {
    res.status(400).send([{ msg: messages.JWT_ACCESS_DENIED, param: getRandomNumber(), type: 'error' }]);
  }
  next();
};

module.exports = verify;
