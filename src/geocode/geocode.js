const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  //console.log(encodedAddress);
  request({
    //url: "https://apis.mapmyindia.com/advancedmaps/v1/397x36529fa2ve7bnzqdd5181bab937n/geo_code?addr=koramangala%20bangalore",
    url: `https://apis.mapmyindia.com/advancedmaps/v1/397x36529fa2ve7bnzqdd5181bab937n/geo_code?addr=${encodedAddress}`,
    json: true
  }, (error , response, body = {}) => {
    if(error){
      callback('No connection');
    }else if (body == null) {
      callback('address is not identified');
    } else if (body.results.length === 0) {
      callback('location not found');
    } else {
      callback(undefined, {
        address : body.results[0].formatted_address,
        //address : body.results[0]
        lat : body.results[0].lat,
        lng : body.results[0].lng
      })
    }
    /*
    console.log(JSON.stringify(body.results[0].formatted_address, undefined, 2));
    console.log(JSON.stringify(body.results[0].lat, undefined, 2));
    console.log(JSON.stringify(body.results[0].lng, undefined, 2));
    */
  });
};

module.exports.geocodeAddress = geocodeAddress;
