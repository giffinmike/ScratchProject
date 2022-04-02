const fetch = require('node-fetch');
const db = require('../models/newsModel');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'google-news1.p.rapidapi.com',
		'X-RapidAPI-Key': '28c1914233msh9110de4ee73575cp1dca2cjsnfffcc805fe3d'
	}
};

const newsController = {};

function retrieveDate(i){
  //&before=2022-03-31&after=2022-04-01
  var date = new Date();
  var yesterday = new Date(date.getTime());
  yesterday.setDate(date.getDate() - i);
  yesterday = JSON.stringify(yesterday).slice(1,11);
  const returnString = `&before=${yesterday}`;
  return returnString;
}

newsController.breakingNews = (req, res, next) => {
  const articlesArray = [];
  function retrieveArticles (query) {
    fetch(`https://google-news1.p.rapidapi.com/search?q=Politics&country=US&lang=en&limit=50${query}`, options)
	  .then(response => response.json())
	  .then(response => {
      for(let i = 0; i < response.articles.length; i++){
        articlesArray.push(response.articles[i])
      }
      res.locals.articles = articlesArray;
      console.log(res.locals.articles.length);
    })
	  .catch(err => next(err));
  }
  const numberOfFetchCalls = 4;
	for(let i = 0; i < numberOfFetchCalls; i++){
    const beforeQuery = retrieveDate(i);
    retrieveArticles(beforeQuery);
  }
  return next();
}

newsController.sortNews = (req, res, next) => {
  console.log("line 26")
  console.log(res.locals.articles)
}

newsController.searchNews = (req, res, next) => {
    
}

module.exports = newsController;