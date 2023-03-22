'use strict';
// !! If port is not working utilize npx kill-port #ofPortBeingUsed
console.log('Woooo our first server! =)');

//** REQUIRES AT THE TOP OF THE PAGE, SIMILAR TO IMPORT FOR REACT BUT FOR THE BACKEND */
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

let weather = require('./data/weather.json');

// ** ONCE WE BRING IN EXPRESS WE CAL IT TO CREATE THE SERVER ***
// ** app === server
const app = express();

//** MIDDLEWARE - CORS kind of like a security guard to share resources across the internet */
app.use(cors());

// ** PORT THAT MY SERVER WILL RUN ON
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`We are running on port ${PORT}`));

// ** ENDPOINTS ***


// *** BASE ENDPOINT - PROOF OF LIFE
// *** 1st arg - string url in quotes
// *** 2nd arg - callback that will execute when that endpoint is hit

app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server!');
});

app.get('/hello', (request, response) => {
  console.log(request.query);
  let userFirstName = request.query.firstName;
  let userLastName = request.query.lastName;

  response.status(200).send(`Hello ${userFirstName} ${userLastName}! Welcome to my server!`);
});

app.get('/weather', (request, response, next) => {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let cityName = request.query.searchQuery;
    console.log(request.query);
    // TODO: Change this to the movie url and map through
    let url = `https://api.weatherbit.io/v2.0/forecast/daily/key=${process.env.WEATHER_API_KEY}/weather?&searchQuery=${cityName}&lat=${lat}&lon=${lon}`;
    let city = weather.find(e => e.city_name.toLowerCase() === cityName.toLowerCase());

    let mappedWeatherToSend = city.data.map(dailyForecast => {
      return new Forecast(dailyForecast);
    });

    response.status(200).send(mappedWeatherToSend);
  } catch (error) {
    next(error);
  }
});
//TODO: MOVIE API ENDPOINT BASED OFF CITY NAME
app.get('/movie', async (request, response, next) => {

  try {
    //TODO: ACCEPT MY QUERIES
    let keywordFromFrontEnd = request.query.searchQuery;
    // TODO: BUILD MY URL FOR AXIOS
    let url = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIES_API_KEY}&language=en-US&page=1&include_adult=false&searchQuery=${keywordFromFrontEnd}`;

    let movieResults = await axios.get(url);

    // TODO: GROOM THAT DATA TO SEND TO FRONTEND
    // let moviesToSend = movieResults.data.map(movie => {
    //   new Movies(movie);
    // });

    response.status(200).send(movieResults.data);
  } catch (error) {
    next(error);
  }

});
// TODO: BUILD ANOTHER CLASS TO TRIM DOWN THAT DATA
class Movies {
  constructor(movieObj){
    this.title=movieObj.original_title;
    this.overview=movieObj.overview;

  }
}

//** CLASS TO GROOM BULKY DATA */
class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.valid_date;
    this.description = weatherObj.weather.description;
    //this.city_name = weatherObj.city_name;
    //this.lon = weatherObj.long;
    //this.lat = weatherObj.lat;
  }
}

//*** CATCH ALL - BE AT THE BOTTOM AND SERVE AS A 404 ERROR MESSAGE */
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist =(');
});

// **** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});
