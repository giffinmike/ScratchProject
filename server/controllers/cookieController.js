const cookieController = {};
const db = require('../models/newsModel.js');
const queries = require('./queries.js');

cookieController.setSSIDCookie = async (req, res, next) => {
  const { username } = req.body;

  if (!res.locals.success) return next();
  
  db.query(queries.getUser, [username], (queryErr, queryRes) => {

    if (queryErr) {
      const err = {
        log: `Query error in cookieController.setSSIDCookie: ${queryErr}`,
        status: 500,
        message: 'Error getting user data. See console.'
      };
      return next(err);
    };

    if (queryRes.rows.length === 0) {
      res.locals.setCookieSuccess = false;
      res.locals.success = false;
      return next();
    }

    res.locals.setCookieSuccess = true;
    const userId = queryRes.rows[0]._id;
    res.cookie('ssid', userId, { httpOnly: true });
    next();

  });
  
}

module.exports = cookieController;