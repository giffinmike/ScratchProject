const db = require('../models/newsModel.js');
const queries = require('./queries.js');
const bcrypt = require('bcrypt');

const userController = {};

userController.createUser = (req, res, next) => {
  const { username, password } = req.body
  if (username && password){

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(hashErr, hash) {

      if (hashErr) {
        const err = {
          log: `Password hashing error. At userController.createUser: ${hashErr}`,
          status: 500,
          message: 'Error creating user info. See console.'
        };
        return next(err);
      };

      db.query(queries.postUser, [username, hash], (queryErr, queryRes) => {

        if (queryErr) {
          const parsedQueryErr = `${queryErr}`;
          const message = parsedQueryErr.includes('duplicate key') ? 
            'Username already exists. Please try again.' :
            'A query error occured posting user data. See console.';
          const err = {
            log: `Query error in userControl.createUser: ${parsedQueryErr}`,
            status: 500,
            message
          }
          return next(err);
        }
        
        res.locals = { 
          username, 
          hash, 
          signUpSuccess: true, 
          success: true 
        };
  
        return next(); 
  
      });

    });

  } else {
    console.log(username, password);
    res.locals.success = false;
    return next();
  }
};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;

  db.query(queries.getUser, [username], (queryErr, queryRes) => {

    if (queryErr) {
      const err = {
        log: `Query error in userController.verifyUser: ${queryErr}`,
        status: 500,
        message: 'Error getting user data. See console.'
      };
      return next(err);
    };

    if (queryRes.rows.length === 0) {
      res.locals.verificationSuccess = false;
      res.locals.success = false;
      return next();
    };

    const hash = queryRes.rows[0].password;
    bcrypt.compare(password, hash, function(hashErr, result) {

      if (hashErr) {
        const err = {
          log: `Password hashing error. At userController.verifyUser: ${hashErr}`,
          status: 500,
          message: 'Error verifying user info. See console.'
        };
        return next(err);
      };

      res.locals.verificationSuccess = result; 
      res.locals.success = true;
      return next();

    });

  })
}

module.exports = userController;