/* eslint-disable */
const path= require('path');
const express = require('express')
const hbs = require('hbs')
const parser = require('body-parser')
const { actualMonthService, nextMonthService, betweenTwoDatesService } = require('./utils/service');
const { isValidDateFormat } = require('./utils/validator');

const urlencodedParser = parser.urlencoded({ extended: true })

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

// set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'NISUM Birthdays',
    })
    
})

// app.get('/thismonth', (req, res) =>{

//     res.render('thismonth', {
//         title: 'Birthdays in the month',
//     })
// })

// app.get('/nextmonth', (req, res) =>{
//     res.render('nextmonth', {
//         title: 'Birthdays in the next month',
//     })
// })

// app.get('/searchinrange', (req, res) =>{
//     res.render('search', {
//         title: 'NISUM Birthdays',
//     })
// })

app.get('/birthday_month_course', (req, res) => {
    const birthdays = actualMonthService();
    res.send(birthdays);
});

app.get('/birthday_next_month', (req, res) => {
    const birthdays = nextMonthService();
    res.send(birthdays);
});

app.get('/birthday_between_dates', (req, res) => {
    const { startDate, endDate } = req.query;
    console.log(req.query)

    if (!startDate || !isValidDateFormat(startDate)) {
        res.send({ error: 'Problems with startDate' });
    }
    if (!endDate || !isValidDateFormat(endDate)) {
        res.send({ error: 'Problems with endDate' });
    }
    const birthdays = betweenTwoDatesService(startDate, endDate);
    res.send(birthdays);
});

app.get('*', function(req, res){
    res.render('errorpage');
});



app.listen(3000);
// app.listen(port, () =>{
//     console.log('server is up and port 3000' + port)
// })

