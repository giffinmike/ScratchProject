const express = require('express');
const userController = require('../controllers/userController');

// app.use(cookieParser());

const router = express.Router();

router.post('/signup', userController.createUser, (req, res) => {
  res.status(200).json(res.locals);
});

router.get('/login', userController.verifyUser, (req, res) => {
  res.status(200).json({ loginSuccess: res.locals.loginSuccess });
});

module.exports = router;