'use strict';
const axios = require('axios');

function getMoviesRefactor(request, response, next) {


  let keywordFromFrontEnd = request.query.searchQuery;

  let baseUrl = `https://api.themoviedb.org/3/search/movie?&language=en-US&page=1&include_adult=false`;

  let queryStrings = {
    client_id: process.env.MOVIES_API_KEY,
    query: keywordFromFrontEnd
  };

  let movieResults = axios.get(baseUrl, { params: queryStrings });

  let moviesToSend = movieResults.data.results.map(movie => {
    return new Movies(movie);
  });

  response.status(200).send(moviesToSend);

}


class Movies {
  constructor(movieObj) {
    this.title = movieObj.original_title;
    this.overview = movieObj.overview;
    this.image = `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`;
  }
}




// async function getMovies(request, response, next) {

//   try {

//     let keywordFromFrontEnd = request.query.searchQuery;

//     let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&language=en-US&page=1&include_adult=false&query=${keywordFromFrontEnd}`;
//     let movieResults = await axios.get(url);

//     // TODO: GROOM THAT DATA TO SEND TO FRONTEND
//     let moviesToSend = movieResults.data.results.map(movie => {
//       return new Movies(movie);
//     });

//     response.status(200).send(moviesToSend);
//   } catch (error) {
//     next(error);
//   }

// }

// // TODO: BUILD ANOTHER CLASS TO TRIM DOWN THAT DATA
// class Movies {
//   constructor(movieObj) {
//     this.title = movieObj.original_title;
//     this.overview = movieObj.overview;
//     this.image = `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`;
//   }
// }



module.exports = getMoviesRefactor;
