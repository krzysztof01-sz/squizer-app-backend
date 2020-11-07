const User = require('../models/User');
const messages = require('../utils/responseMessages');
const { validate, getRandomNumber } = require('../utils/functions');

const loginController = async (req, res) => {
  const validationErrors = validate(req);

  if (!validationErrors.isEmpty()) return res.status(400).send(validationErrors.array());
  else {
    const clientToken = req.headers['csrf-token'];
    const serverToken = req.body.csrfToken;

    if (serverToken === clientToken) {
      try {
        const [response] = await User.loginUser({ ...req.body });
        res.header('auth-token', response.token);
        res.json([response]);
      } catch (err) {
        res.status(400).send(err);
      }
    } else {
      return res.status(400).send([{ msg: messages.INVALID_CSRF, param: getRandomNumber(), type: 'error' }]);
    }
  }
};

module.exports = { loginController };
