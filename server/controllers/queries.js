const queries = {};

queries.postUser = `INSERT INTO user_data 
  (username, password) 
  VALUES ($1, $2)`;