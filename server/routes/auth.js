const express = require('express');

app.use(cookieParser());

const router = express.Router();

router.get('/signup', userController.createUser, (req, res) => {
  res.status(200).json(res.locals);
})