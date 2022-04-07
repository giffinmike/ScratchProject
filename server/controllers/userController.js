const db = require('../models/newsModel.js');
const queries = require('queries');

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body
  if (username && password){
    
    db.query(queries.postUser, [username, password], (queryErr, queryRes) => {

      if (queryErr) {
        const err = {
          log: `Query error in postUser: ${queryErr}`,
          status: 500,
          message: `A query error occured posting user data. See console.`
        }
        return next(err);
      }
      console.log('user data post success');
      res.locals = { username, password };

      return next(); 
      
    });

  }
};