const express = require('express');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');

// app.use(cookieParser());

const router = express.Router();

router.post('/signup', 
  userController.createUser, 
  cookieController.setSSIDCookie,
  (req, res) => {
    res.status(200).json(res.locals);
  } 
);

router.get('/login', 
  userController.verifyUser, 
  cookieController.setSSIDCookie,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

module.exports = router;