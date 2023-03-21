'use strict';
// !! If port is not working utilize npx kill-port #ofPortBeingUsed
console.log('Woooo our first server! =)');

//** REQUIRES AT THE TOP OF THE PAGE, SIMILAR TO IMPORT FOR REACT BUT FOR THE BACKEND */
const express = require('express');
require('dotenv').config();
const cors = require('cors');

let weatherData = require('./data/weather.json');

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

app.get('/hello',(request,response)=>{
  console.log(request.query);
  let userFirstName = request.query.firstName;
  let userLastName = request.query.lastName;

  response.status(200).send(`Hello ${userFirstName} ${userLastName}! Welcome to my server!`);
});

app.get('/weather', (request, response, next) => {
  try {
    let queriedCity = request.query.city;
    let queriedLong = request.query.lon;
    let queriedLat = request.query.lat;

    let dataToParse = weatherData.find(e => e.city_name === queriedCity);

    let dataToSend = new Forecast (dataToParse);

    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }
});

//** CLASS TO GROOM BULKY DATA */
class Forecast {
  constructor(weatherObj){
    this.city_name = weatherObj.city_name;
    // this.lon = weatherObj.lon;
    //this.date = weatherObj.date
    //this.description = weatherObj.description
  }
}

//*** CATCH ALL - BE AT THE BOTTOM AND SERVE AS A 404 ERROR MESSAGE */
app.get('*',(request, response) =>{
  response.status(404).send('This route does not exist =(');
});

// **** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});
