const csrf = require('csurf');
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.ENV === 'production',
    sameSite: 'strict',
  },
});

module.exports = { csrfProtection };
