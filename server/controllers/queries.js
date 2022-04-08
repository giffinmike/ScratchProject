const queries = {};

queries.postUser = `INSERT INTO user_data 
  (username, password) 
  VALUES ($1, $2)`;

queries.getUser = `SELECT * FROM user_data 
  WHERE username=$1`;

queries.postSession = `INSERT INTO sessions
  (user_id)
  VALUES ($1)`;

module.exports = queries;