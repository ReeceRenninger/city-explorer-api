'use strict';
const axios = require('axios');

let cache = {};

async function getMovies(request, response, next) {

  try {

    let keywordFromFrontEnd = request.query.searchQuery;
    let key = `${keywordFromFrontEnd}- Movie`;
    // 12 hour cache
    if (cache[key] && (Date.now() - cache[key].timestamp) < 4.32e+7) {
      console.log('Movie cache was hit!', cache);

    } else {
      console.log('No items in moviesCache');
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&language=en-US&page=1&include_adult=false&query=${keywordFromFrontEnd}`;
      let movieResults = await axios.get(url);

      // TODO: GROOM THAT DATA TO SEND TO FRONTEND
      let moviesToSend = movieResults.data.results.map(movie => {
        return new Movies(movie);
      });

      //** BUILD INTO CACHE */
      cache[key] ={
        data: moviesToSend,
        timestamp: Date.now()
      };

      response.status(200).send(moviesToSend);
    }

  } catch (error) {
    next(error);
  }

}

// TODO: BUILD ANOTHER CLASS TO TRIM DOWN THAT DATA
class Movies {
  constructor(movieObj) {
    this.title = movieObj.original_title;
    this.overview = movieObj.overview;
    this.image = `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`;
  }
}

// function getMoviesRefactor(request, response, next) {


//   let keywordFromFrontEnd = request.query.searchQuery;

//   let baseUrl = `https://api.themoviedb.org/3/search/movie?&language=en-US&page=1&include_adult=false`;

//   let queryStrings = {
//     client_id: process.env.MOVIES_API_KEY,
//     query: keywordFromFrontEnd
//   };

//   axios.get(baseUrl, { params: queryStrings })
//     .then(movieResults => movieResults.data.results.map(movie => new Movies(movie)))
//     .then(moviesToSend => response.status(200).send(moviesToSend))
//     .catch(error => next(error));

// }


// class Movies {
//   constructor(movieObj) {
//     this.title = movieObj.original_title;
//     this.overview = movieObj.overview;
//     this.image = `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`;
//   }
// }







module.exports = getMovies;
