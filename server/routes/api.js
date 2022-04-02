const express = require('express');

const newsController = require('../controllers/newsController');

const router = express.Router();

//fetch top breaking news, order them, send back
router.get('/',
  newsController.breakingNews,
  newsController.sortNews,
  (req, res) => res.status(200).json()
);

//fetch news based on search, order them, send back
router.get('/search',
  newsController.searchNews,
  newsController.sortNews,
  (req, res) => res.status(200).json()
)