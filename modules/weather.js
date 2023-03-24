'use strict';
const axios = require('axios');

let cache = {};

// TODO: need to create a key for the data to store
// TODO: if the thing exists AND within a valid timeframe ... send that data from cache
// TODO: if the thing does NOT exist - call my API

async function getWeather(request, response, next) {

  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let key = `lat: ${lat} lon:${lon}- Weather`; // key = lat lon -Weather

    // 12 hour cache
    if (cache[key] && (Date.now() - cache[key].timestamp) < 4.32e+7) {

      console.log('Weather cache was hit!', cache);

      response.status(200).send(cache[key].data);
    } else {
      console.log('No items in weatherCache');
      let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&lat=${lat}&lon=${lon}`;

      let weatherResults = await axios.get(url);

      let mappedWeatherToSend = weatherResults.data.data.map(dailyForecast => {
        return new Forecast(dailyForecast);
      });

      // ** BUILD INTO CACHE **
      cache[key] = {
        data: mappedWeatherToSend,
        timestamp: Date.now()
      };

      response.status(200).send(mappedWeatherToSend);
    }
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
