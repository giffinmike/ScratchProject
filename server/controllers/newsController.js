const fetch = require('node-fetch');
const db = require('../models/newsModel');
const biasData = require('../allSidesData/allsides')

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'google-news1.p.rapidapi.com',
		'X-RapidAPI-Key': '28c1914233msh9110de4ee73575cp1dca2cjsnfffcc805fe3d'
	}
};

const newsController = {};

// function retrieveDate(i){
  //&before=2022-03-31&after=2022-04-01
//   var date = new Date();
//   var yesterday = new Date(date.getTime());
//   yesterday.setDate(date.getDate() - i);
//   yesterday = JSON.stringify(yesterday).slice(1,11);
//   const returnString = `&before=${yesterday}`;
//   return returnString;
// }

newsController.breakingNews = (req, res, next) => {
  let articlesArray = [];
  fetch('https://google-news1.p.rapidapi.com/top-headlines?country=US&lang=en&limit=50&media=true', options)
	.then(response => response.json())
	.then(response => {
    for(let i = 0; i < response.articles.length; i++){
      articlesArray.push(response.articles[i])
    }
    console.log('fetch call number 1')
    fetch('https://google-news1.p.rapidapi.com/topic-headlines?topic=NATION&country=WORLD&lang=en&limit=50&media=true', options)
	  .then(response => response.json())
	  .then(response => {
    for(let i = 0; i < response.articles.length; i++){
      articlesArray.push(response.articles[i])
    }
    console.log('fetch call number 2')
    fetch('https://google-news1.p.rapidapi.com/search?q=Democrat&country=US&lang=en&limit=50&when=30d&media=true', options)
      .then(response => response.json())
      .then(response => {
      for(let i = 0; i < response.articles.length; i++){
        articlesArray.push(response.articles[i])
      }
      console.log('fetch call number 3')
      fetch('https://google-news1.p.rapidapi.com/search?q=Republican&country=US&lang=en&limit=50&when=30d&media=true', options)
          .then(response => response.json())
          .then(response => {
          for(let i = 0; i < response.articles.length; i++){
            articlesArray.push(response.articles[i])
          }
          console.log('fetch call number 4')
          res.locals.articles = articlesArray;
          return next();
          })
      })
    }
  )
	.catch(err => next(err));
  })
};

newsController.sortNews = (req, res, next) => {
  
  const returnArray = [[],[],[],[],[]];
  res.locals.articles.forEach ((el, i, arr) => {
    
    let publication;
    el.source.title.startsWith('The ') ? 
      publication = el.source.title.slice(4).toLowerCase() : 
      publication = el.source.title.toLowerCase();

    for(let i = 0; i <= biasData.length; i++){
      if (i < biasData.length) {
    
        if(biasData[i].name.toLowerCase().includes(publication)) {

        switch(biasData[i].bias) {
          case 'left':
            // console.log('left -->', publication)
            returnArray[0].push(el);
            break;
          case 'left-center':
            // console.log('left-center -->', publication)  
            returnArray[1].push(el);
            break;
          case 'center':
            // console.log('center -->', publication)  
            returnArray[2].push(el);
            break;
          case 'right-center':
            // console.log('right-center -->', publication)  
            returnArray[3].push(el);
            break;
          case 'right':
          //  console.log('right -->', publication)
            returnArray[4].push(el);
            break;
        };
        break;
      }} 
      // else {
      //   console.log('NO BIAS FOUND -->', publication)
      // }
    };
  });
  console.log(returnArray[0].length, returnArray[1].length, returnArray[2].length, returnArray[3].length, returnArray[4].length);
  // for(let i = 0; i < returnArray.length; i++){

  // }
}

newsController.searchNews = (req, res, next) => {
    
}

module.exports = newsController;