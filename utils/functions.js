const { validationResult } = require("express-validator");
const { photoTypes } = require("./photoTypes");
const responseTypes = require("./responseTypes");

const prefferedExtensions = ["png", "jpg", "jpeg"];

const validateAvatar = (avatar) => {
  if (!avatar) return false;
  if (avatar === photoTypes.default) return true;
  else {
    if (avatar.name) {
      return prefferedExtensions.includes(avatar.name.split(".")[1]);
    } else return false;
  }
};

const validate = (req) => {
  return validationResult(req).formatWith(({ msg }) => {
    return { msg, type: responseTypes.error };
  });
};

const getArrayOf = (resp) => [resp].flat();

const makeResponse = (msg, type) => ({
  msg,
  type,
});

const shuffleArray = (arr) => {
  arr = arr.sort(() => Math.random() - 0.5);
  return arr;
};

module.exports = { validateAvatar, validate, getArrayOf, makeResponse, shuffleArray };
