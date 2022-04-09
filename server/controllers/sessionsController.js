const db = require('../models/newsModel.js');
const queries = require('./queries.js');

const sessionController = {};

sessionController.deleteExistingSession = (req, res, next) => {
  const { username } = req.body;

  db.query(queries.getUserFromUsername, [username], (userErr, userRes) => {
    
    if (userErr) {
      const err = {
        log: `Query error in sessionController.deleteExistingSession: ${userErr}`,
        status: 500,
        message: 'Error deleting session. See console.'
      };
      return next(err);
    };

    const user_id = userRes.rows[0]._id;
    db.query(queries.deleteSession, [user_id], (deleteErr, deleteRes) => {
      if (deleteErr) {
        const err = {
          log: `Query error in sessionController.deleteExistingSession: ${deleteErr}`,
          status: 500,
          message: 'Error deleting session. See console.'
        };
        return next(err);
      };

      return next();
    })


  })

  db.query(queries.deleteSession, [username], (userErr, userRes) => {

    
  })
}

sessionController.startSession = (req, res, next) => {
  const { username } = req.body;

  

  if (!res.locals.success) return next();

  db.query(queries.getUserFromUsername, [username], (userErr, userRes) => {

    if (userErr) {
      const err = {
        log: `Query error in sessionController.startSession: ${userErr}`,
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
  if (!res.locals.userExists) return next();
  const { ssid } = req.cookies;

  db.query(queries.getSession, [ssid], (queryErr, queryRes) => {

    if (queryErr) {
      const err = {
        log: `Query error in sessionController.isLoggedIn: ${queryErr}`,
        status: 500,
        message: 'Error getting session data. See console.'
      };
      return next(err);
    };

    if (queryRes.rows.length === 0) {
      res.locals.isLoggedIn = false;
      return next();
    }

    console.log(queryRes.rows);
    const { expiration } = queryRes.rows[0];
    expiration = timestampToMs(expiration);
    if (Date.now() > expiration) {
      res.locals.isLoggedIn = false;

    }
    res.locals.isLoggedIn = true;
    return next();

  });
}

sessionController.checkUserExists = (req, res, next) => {
  const { ssid } = req.cookies;

  if (!ssid) {
    res.locals.userExists = false;
    return next();
  }

  db.query(queries.getUserFromId, [ssid], (userErr, userRes) => {
    
    if (userErr) {
      const err = {
        log: `Query error in sessionController.checkUserExists: ${userErr}`,
        status: 500,
        message: 'Error getting user data for session. See console.'
      };
      return next(err);
    };

    if (userRes.rows.length === 0) {
      res.locals.userExists = false;
      return next();
    }

    res.locals.userExists = true;
    return next();

  });
}

const timestampToMs = (timestamp) => {
  const t = timestamp.split(/[- : . T Z]/);
  return Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5], t[6]);
}

module.exports = sessionController;