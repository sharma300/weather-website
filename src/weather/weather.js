const request = require('request');

var weatherInfo = (lat, lng, callback) => {
  request({url : `https://api.darksky.net/forecast/3780fc7071505c342594efc2d5885d15/${lat},${lng}`,
  json : true
},(error, response, body) => {
  if(!error && response.statusCode ===200){
    callback(undefined, {
      temperature: body.currently.temperature,
      apparentTemperature: body.currently.apparentTemperature
    });
  } else {
      callback('Unable to fetch weather.');
  }
}
)};

module.exports.weatherInfo = weatherInfo;
