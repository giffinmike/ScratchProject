const { query } = require('express');
const db = require('../models/newsModel.js');
const queries = require('./queries.js');

const userController = {};

userController.createUser = (req, res, next) => {
  const { username, password } = req.body
  if (username && password){

    db.query(queries.postUser, [username, password], (queryErr, queryRes) => {

      if (queryErr) {
        const parsedQueryErr = `${queryErr}`;
        const message = parsedQueryErr.includes('duplicate key') ? 
          'Username already exists. Please try again.' :
          'A query error occured posting user data. See console.';
        const err = {
          log: `Query error in postUser: ${parsedQueryErr}`,
          status: 500,
          message
        }
        return next(err);
      }
      console.log('user data post success');
      res.locals = { username, password };

      return next(); 

    });

  }
};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;

  db.query(queries.getUser, [username], (queryErr, queryRes) => {

    if (queryErr) {
      const parsedQueryErr = `${queryErr}`;
      const err = {
        log: `Query error in userController.verifyUser: ${parsedQueryErr}`,
        status: 500,
        message: 'Error getting user data. See console.'
      }
      return next(err);
    }

    const loginSuccess = queryRes.rows.length !== 0 && 
      queryRes.rows[0].password === password;

    res.locals.loginSuccess = loginSuccess;
    
    next();
  })
}

module.exports = userController;