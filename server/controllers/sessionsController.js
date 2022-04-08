const db = require('../models/newsModel.js');
const queries = require('./queries.js');

sessionController.startSession = async (req, res, next) => {
  const { username } = req.body;

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
      res.locals.sessionSuccess = false;
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
  
      console.log(queryRes);
      res.locals.sessionSuccess = true;
      next();
  
    });

  });
};

module.exports = sessionController;