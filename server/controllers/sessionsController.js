const db = require('../models/newsModel.js');
const queries = require('./queries.js');

const sessionController = {};

sessionController.startSession = (req, res, next) => {
  const { username } = req.body;

  if (!res.locals.success) return next();

  db.query(queries.getUser, [username], (userErr, userRes) => {

    if (userErr) {
      const err = {
        log: `Query error in sessionController.startSession: ${queryErr}`,
        status: 500,
        message: 'Error getting user data for session. See console.'
      };
      return next(err);
    };

    if (userRes.rows.length === 0) {
      res.locals.startSessionSuccess = false;
      res.locals.success = false;
      next();
    }

    const userId = userRes.rows[0]._id;
    db.query(queries.postSession, [userId], (queryErr, queryRes) => {

      if (queryErr) {
        const err = {
          log: `Query error in sessionController.startSession: ${queryErr}`,
          status: 500,
          message: 'Error posting session data. See console.'
        };
        return next(err);
      };
  
      res.locals.startSessionSuccess = true;
      next();
  
    });

  });
};

sessionController.isLoggedIn = (req, res, next) => {
  
}

module.exports = sessionController;