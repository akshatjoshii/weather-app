/**
 * Created by Akshat Joshi on 04-04-2017.
 */
const request = require('request');

var url = "http://maps.googleapis.com/maps/api/geocode/json";
var forecastUrl = "https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/";

var weather = {

    getAddress(address){
    return new Promise((resolve, reject)=>{
        request({
            url: url+'?address='+address,
            json:true
        },  (error, response, body) =>{
            if(body && body.results && body.results[0].geometry && body.results[0].geometry.location ){
                resolve(body);
            }else{
                reject("Not able to fetch location")
            }

        });
    });

},
    getForeCast(lat, lng){
        return new Promise((resolve, reject)=>{
            request({
                url: forecastUrl+`${lat}, ${lng}`,
                json:true
            }, (error, response, body)=>{
                console.log(response.statusCode);
                if(response.statusCode=='200'){
                    resolve(body);
                }else{
                    reject("Unable to fetch weather information")
                }
            })
        })
    }
};

module.exports = weather;