const request = require('request');

const forecast = (lat , lon, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=15912b22b94f538b45abcde9e881dfb4&query='+ lat + ', '+ lon +'';
    request({ url, json: true }, (error, {body}) => {   //using destructure property for oblect RESPONSE
            if (error) {
                callback("Unable to connect",undefined)
            } else if (body.error) {
                callback("Unable to get the location",undefined)
            }
            else {
                callback(undefined,"It is currently " + body.current.temperature + " degress out there and " + body.current.precip + "% chance of raining")
            }
        });
}

module.exports = forecast;