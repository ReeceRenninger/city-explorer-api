'use strict';
// !! If port is not working utilize npx kill-port #ofPortBeingUsed
console.log('Woooo our first server! =)');

//** REQUIRES AT THE TOP OF THE PAGE, SIMILAR TO IMPORT FOR REACT BUT FOR THE BACKEND */
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const getWeather = require('./modules/weather.js');
const getMovies = require('./modules/movies.js');

// ** ONCE WE BRING IN EXPRESS WE CAL IT TO CREATE THE SERVER ***
// ** app === server
const app = express();

//** MIDDLEWARE - CORS kind of like a security guard to share resources across the internet */
app.use(cors());

// ** PORT THAT MY SERVER WILL RUN ON
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`We are running on port ${PORT}`));


//!! CALLS MY WEATHER FUNCTION
app.get('/weather', getWeather);
//!! CALLS MY MOVIES FUNCTION
app.get('/movies', getMovies);
// app.get('/', (request, response) => {
//   response.status(200).send('Welcome to my server!');
// });

// app.get('/hello', (request, response) => {
//   console.log(request.query);
//   let userFirstName = request.query.firstName;
//   let userLastName = request.query.lastName;

//   response.status(200).send(`Hello ${userFirstName} ${userLastName}! Welcome to my server!`);
// });




//*** CATCH ALL - BE AT THE BOTTOM AND SERVE AS A 404 ERROR MESSAGE */
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist =(');
});

// **** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});
