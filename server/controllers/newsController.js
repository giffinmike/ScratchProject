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

// newsController.breakingNews = (req, res, next) => {
//   const articlesArray = [];
//   function retrieveArticles (query) {
//     fetch(`https://google-news1.p.rapidapi.com/search?q=Politics&country=US&lang=en&limit=50${query}`, options)
// 	  .then(response => response.json())
// 	  .then(response => {
//       for(let i = 0; i < response.articles.length; i++){
//         articlesArray.push(response.articles[i])
//       }
//       res.locals.articles = articlesArray;
//       console.log(res.locals.articles.length);
//     })
// 	  .catch(err => next(err));
//   }
//   const numberOfFetchCalls = 4;
// 	for(let i = 0; i < numberOfFetchCalls; i++){
//     const beforeQuery = retrieveDate(i);
//     retrieveArticles(beforeQuery);
//   }
//   return next();
// }

newsController.breakingNews = (req, res, next) => {
  let articlesArray = [];
  fetch(`https://google-news1.p.rapidapi.com/search?q=Politics&country=US&lang=en&limit=50&when=30d&media=true${retrieveDate(0)}`, options)
	.then(response => response.json())
	.then(response => {
    for(let i = 0; i < response.articles.length; i++){
      articlesArray.push(response.articles[i])
    }
  })
  .then(
    fetch(`https://google-news1.p.rapidapi.com/search?q=Politics&country=US&lang=en&limit=50&when=30d&media=true${retrieveDate(1)}`, options)
	  .then(response => response.json())
	  .then(response => {
    for(let i = 0; i < response.articles.length; i++){
      articlesArray.push(response.articles[i])
    }
    })
  )
  .then(
    fetch(`https://google-news1.p.rapidapi.com/search?q=Politics&country=US&lang=en&limit=50&when=30d&media=true${retrieveDate(2)}`, options)
	  .then(response => response.json())
	  .then(response => {
    for(let i = 0; i < response.articles.length; i++){
      articlesArray.push(response.articles[i])
    }
    })
  )
  .then(
    fetch(`https://google-news1.p.rapidapi.com/search?q=Politics&country=US&lang=en&limit=50&when=30d&media=true${retrieveDate(3)}`, options)
	  .then(response => response.json())
	  .then(response => {
    for(let i = 0; i < response.articles.length; i++){
      articlesArray.push(response.articles[i])
    }
    res.locals.articles = articlesArray;
    return next();
    })
  )
	.catch(err => next(err));
}

// newsController.breakingNews = (req, res, next) => {
  
//   async function retrieveArticles (query) {
    
//     let response = await fetch(`https://google-news1.p.rapidapi.com/search?q=Politics&country=US&lang=en&limit=50${query}`, options);
//     response = response.json();
//     console.log(response);
//     // res.locals.articles = [...response.articles];
// 	  // console.log(res.locals.articles.length);
//   }

//   const numberOfFetchCalls = 4;
//   for(let i = 0; i < numberOfFetchCalls; i++){
//     const beforeQuery = retrieveDate(i);
//     retrieveArticles(beforeQuery);
//   }

//   return next();
// }

newsController.sortNews = (req, res, next) => {
  console.log("line 26")
  console.log(res.locals.articles[0])
  //SELECT bias FROM allsides WHERE name={theName};
  //const speciesId = [`${req.query.id}`];
  // const text = `SELECT species.classification, species.average_height, species.average_lifespan, 
  // species.language, species.name, planets.name homeworld
  // FROM species LEFT JOIN planets ON species.homeworld_id = planets._id WHERE species._id = $1`;
  
  // db.query(text, speciesId)
  // .then((data) => {
  //   res.locals.species = data.rows[0];
  //   return next();
  // })
  for(i = 0; i < 2; i++){
    let publication;
    res.locals.articles[i].source.title.startsWith('The ') ? 
      publication = res.locals.articles[i].source.title.slice(4) : 
      publication = res.locals.articles[i].source.title;
    console.log(publication);
    const text = `SELECT bias FROM allsides_data WHERE name = '${publication}'`;
    console.log(text)
    db.query(text)
      .then((data) => {
        // console.log(data);
        // console.log(data.rows);
        console.log(data.rows[0]);
      })
  }
}

newsController.searchNews = (req, res, next) => {
    
}

module.exports = newsController;