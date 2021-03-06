const jwt = require("jsonwebtoken");
const { makeResponse } = require("../utils/functions");
const messages = require("../utils/responseMessages");
const responseTypes = require("../utils/responseTypes");

const verify = (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) throw makeResponse(messages.JWT_ACCESS_DENIED, responseTypes.error);
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } catch (e) {
    if (typeof e === "object") e = makeResponse(messages.JWT_ACCESS_DENIED, responseTypes.error);
    req.user = null;
  }
  next();
};

module.exports = verify;
