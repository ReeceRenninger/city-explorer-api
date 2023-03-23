'use strict';
const axios = require('axios');

async function getWeather(request, response, next) {

  try {
    let lat = request.query.lat;
    let lon = request.query.lon;

    console.log(request.query);
    // TODO: Change this to the movie url and map through

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&lat=${lat}&lon=${lon}`;

    let weatherResults = await axios.get(url);

    let mappedWeatherToSend = weatherResults.data.data.map(dailyForecast => {
      return new Forecast(dailyForecast);
    });

    response.status(200).send(mappedWeatherToSend);
  } catch (error) {
    next(error);
  }
}
//** CLASS(ES) TO GROOM BULKY DATA */
class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.valid_date;
    this.description = weatherObj.weather.description;
    this.lon = weatherObj.lon;
    this.lat = weatherObj.la;
  }
}

module.exports = getWeather;
