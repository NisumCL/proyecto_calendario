/* eslint-disable */
const path= require('path');
const express = require('express')
const hbs = require('hbs')
const parser = require('body-parser')
const urlencodedParser = parser.urlencoded({ extended: false })
const { bigMain } = require('./app')

const app = express()
// const port = process.env.PORT || 3000

// //define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(urlencodedParser)
app.use(parser.json())
//set up handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// //set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'NISUM Birthdays',
        body: 'birthdays list'
    })
    
})

app.get('/thismonth', (req, res) =>{
    res.render('thismonth', {
        title: 'Birthdays in the month',
        // subtitle: 'The birthdates por the interval are: ',
        // body: 'birthdays list'
    })
})

app.get('/nextmonth', (req, res) =>{
    res.render('nextmonth', {
        title: 'Birthdays in the next month',
        // subtitle: 'The birthdates por the interval are: ',
        // body: 'birthdays list'
    })
})

app.get('/searchinrange', (req, res) =>{
    res.render('searchinrange', {
        title: 'Birthdays in the Range',
        // subtitle: 'The birthdates por the interval are: ',
        // body: 'birthdays list'
    })
})
app.get('/theDates', urlencodedParser, (req, res)=>{
    if(!req.body){
        return res.send({
            error: 'You must provide two dates to search inbetween 😅'
        })
    }
    // forecast( latitude, longitude, (error, forecastData) =>{
    //     if(error){
    //         return res.send({error})
    //     } 
    //     res.send({
    //         forecast: forecastData,
    //         location,
    //         latitude,
    //         longitude
    //     })
    // })
    bigMain( req.body.startDate, req.body.endDate ) => {
        res.send({
            res.birthdaysList
        })
    }
})


app.get('*', function(req, res){
    res.render('errorpage');
});




// app.get('/birthdays', (req, res)=>{
//     if(!req.query.datesrange){
//         return res.send({
//             error: 'You must a range to search for 😅'
//         })
//     } 

//     bigMain(req.query.datesrange, (error, {birthdaysList} = {}) => {
//         if(error){
//             return res.send({error})
//         }
//         res.send({
//             birthdaysList
//         })
//     })

// })








app.listen(3000);
// app.listen(port, () =>{
//     console.log('server is up and port 3000' + port)
// })

