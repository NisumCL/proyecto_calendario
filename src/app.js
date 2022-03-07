/* eslint-disable */
const path = require('path');
const hbs = require('hbs');
const express = require('express');
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



//------------------------------------------------------------------------

app.get('', (req, res) => {
  res.render('index', {
    title: 'Birthday app',
  });
});

app.get('/currentMonth', (req, res) => {
  res.render('currentMonth', {
    title: 'Current Month',
  });
});

app.get('/nextMonth', (req, res) => {
  res.render('nextMonth', {
    title: 'Next Month',
  });
});

app.get('/betweenDates', (req, res) => {
  res.render('betweenDates', {
    title: 'Between Dates',
  });
});

//------------------------------------------------------------------------

app.get('/birthday_month_course', (req, res) => {
  try {
    const birthdays = actualMonthService();
    res.send(birthdays);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get('/birthday_next_month', (req, res) => {
  try {
    const birthdays = nextMonthService();
    res.send(birthdays);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/birthday_between_dates', (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !isValidDateFormat(startDate)) {
      res.send({ error: 'Problems with startDate' });
    }
    if (!endDate || !isValidDateFormat(endDate)) {
      res.send({ error: 'Problems with endDate' });
    }
    const birthdays = betweenTwoDatesService(startDate, endDate);
    res.send(birthdays);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found.',
  });
});


const port = 3000
app.listen(port, () =>{
    console.log('server is up and port ' + port)
})

