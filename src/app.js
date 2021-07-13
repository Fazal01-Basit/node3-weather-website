const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//const boot = path.join(__dirname,'../node_modules/bootstrap/min/css')

//setup handlebars and views directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Bootstrap path
app.use(express.static(path.join(__dirname,'../node_modules/bootstrap/dist/css')))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Fazal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Fazal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Fazal',
        title: 'Help',
        description: 'help page'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
                

            })
        })
    })

   
    // res.send({
    //     location: 'Kolkata',
    //     forcast: 'Its 50 degrees out there.',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        producuts: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Fazal',
        errorMessage: 'Help Article Not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Fazal',
        title: '404',
        errorMessage: 'Page Not Found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})