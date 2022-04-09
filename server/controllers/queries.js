const queries = {};

queries.postUser = `INSERT INTO user_data 
  (username, password) 
  VALUES ($1, $2)`;

queries.getUserFromUsername = `SELECT * FROM user_data 
  WHERE username=$1`;

queries.getUserFromId = `SELECT * FROM user_data 
  WHERE _id=$1`;

queries.postSession = `INSERT INTO sessions
  (user_id)
  VALUES ($1)`;

queries.getSession = `SELECT * FROM sessions 
  WHERE user_id=$1`;

queries.deleteSession = `DELETE FROM sessions
  WHERE user_id=$1`

module.exports = queries;