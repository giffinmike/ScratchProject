const db = require('../models/newsModel');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'google-news1.p.rapidapi.com',
		'X-RapidAPI-Key': '387b79ec78msha5979f99b7dcb67p1d3368jsn07f98128bb9f'
	}
};

const newsController = {};

newsController.breakingNews = (req, res, next) => {
  fetch('https://google-news1.p.rapidapi.com/top-headlines?country=US&lang=en&limit=100', options)
	.then(response => response.json())
	.then(response => console.log(response))
}

newsController.sortNews = (req, res, next) => {
    
}

newsController.searchNews = (req, res, next) => {
    
}