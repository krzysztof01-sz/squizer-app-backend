const { validationResult } = require('express-validator');
const prefferedExtensions = ['png', 'jpg', 'jpeg'];

const validate = req => {
  return validationResult(req).formatWith(({ msg }) => {
    return { msg, param: getRandomNumber(), type: 'error' };
  });
};

const validatePhoto = file => {
  if (!file) return false;
  if (file === 'defaultPhoto') return true;
  else {
    if (file.name) {
      return prefferedExtensions.includes(file.name.split('.')[1]) ? true : false;
    } else return false;
  }
};

const getRandomNumber = () => Math.random().toString();

module.exports = { validatePhoto, validate, getRandomNumber };
