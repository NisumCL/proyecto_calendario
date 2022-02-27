/* eslint-disable */
const path= require('path');
const express = require('express')
const hbs = require('hbs')
const { actualMonthService, nextMonthService, betweenTwoDatesService } = require('./utils/service');
const { isValidDateFormat } = require('./utils/validator');

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) =>{
    res.render('index', {
        title: 'NISUM Birthdays',
    })
})


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


const port = 3000
app.listen(port, () =>{
    console.log('server is up and port ' + port)
})

