const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=51c016904d0bf847b090f8813c020409&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true}, (error, {body}={}) => {
        if(error){
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error){
            callback('unable to find location', undefined)
        }else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out fahrenheit. It feels like ' + body.current.feelslike + ' degrees fahrenheit out. Current wind speed is ' + body.current.wind_speed + '. Current Pressure is ' + body.current.pressure)
            
        }
    })
}

module.exports = forecast

