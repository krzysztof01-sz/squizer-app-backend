const csrf = require('csurf');
const csrfProtection = csrf({ cookie: { secure: true, sameSite: 'lax', httpOnly: true } });

module.exports = { csrfProtection };
