const prefferedExtensions = ['png', 'jpg', 'jpeg'];

const validatePhoto = file => {
  if (!file) return false;
  if (file === 'defaultPhoto') return true;
  else {
    if (file.name) {
      return prefferedExtensions.includes(file.name.split('.')[1]) ? true : false;
    } else return false;
  }
};

const normalizeResponse = resp => [resp].flat();

const makeResponse = (msg, type) => ({
  msg,
  type,
});

module.exports = { validatePhoto, normalizeResponse, makeResponse };
