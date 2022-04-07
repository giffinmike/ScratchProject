const fs = require('fs');
const path = require('path');

const mockUsersDb = path.resolve(__dirname, '../models/authModel.json');

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body
  if (username && password){
    
    const allUsers = JSON.parse(fs.readFileSync(mockUsersDb));
    if (allUsers[username]) {
      const err = {
        log: 'Username already exists. See userController.createUser',
        status: 500,
        message: { err: 'Username already exists. See console.' },
      };
      next(err);
    }
    
    allUsers[username] = password;
    console.log(allUsers);
    fs.writeFileSync(mockUsersDb, JSON.stringify(allUsers));
  
    return next(); 
  }
  res.render('../client/signup.ejs', {error: 'go home'})
};