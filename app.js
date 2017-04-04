/**
 * Created by Akshat Joshi on 04-04-2017.
 */
console.log("Starting weather app");


const yargs = require('yargs');
const weather = require('./weather');

var argv = yargs.options({
   a: {
       demand: true,
       alias: "address",
       describe: "Address to fetch",
       string: true
   }
}).help().alias('help', 'h').argv;



if(argv.address){
    weather.getAddress(encodeURIComponent(argv.address))
        .then((body) =>{
            let location = body.results[0].geometry.location;
            console.log(JSON.stringify(body.results[0].geometry.location, undefined, 2));
            return weather.getForeCast(location.lat, location.lng);
        }).then((weatherInfo)=>{
            console.log(`It is ${weatherInfo.currently.temperature}, but it feels like ${weatherInfo.currently.apparentTemperature} `)
    }).catch((err)=>{
        console.log(err);
    })
}else{
    console.log("Please provide address");
}

