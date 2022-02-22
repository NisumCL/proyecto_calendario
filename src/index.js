/* eslint-disable */
const path= require('path');
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//set up handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather App 🌦️',
        nombre: 'Fran L'
    })
})
app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About',
        nombre: 'Fran L',
        src: '/img/imgbin_bender-fan-art-png.png'
    })
})

// app.get('/products', (req, res) =>{
//     if(!req.query.search){
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     } else{
//         console.log(req.query.search)
//         res.send({
//             products: []
//         })
//     }

// })

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address to look for 😅'
        })
    } 
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        
        forecast( latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            } 
            res.send({
                forecast: forecastData,
                location,
                latitude,
                longitude
            })
        })
    })

})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help',
        help_message: 'This is a help message, if you have some question, ask God, because this is nothing else than a nice lorem ipsum.',
        nombre : 'Fran L'
    })
})
// el asterisco es para atrapar cualquier ruta que no este especificada, que tire error.
app.get('/help/*', (req, res)=>{
    res.render('404_no_help_article',{
        title: '404',
        errorMessage: '404 error: Help article not Found. Please try the urls on top',
        nombre : 'Fran L'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        errorMessage: '404 error: Page not Found. Please try the urls on top',
        nombre : 'Fran L'
    })
})



// app.get('/help', (req, res)=>{
//     res.send([{
//         nombre: 'Fran',
//         age: 39
//     },
//     {
//         nombre: 'Byron',
//         age: 17
//     }])
// })


app.listen(port, () =>{
    console.log('server is up and port 3000' + port)
})

