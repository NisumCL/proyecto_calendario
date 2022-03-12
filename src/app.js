/* eslint-disable */
const path = require('path');
const hbs = require('hbs');
const express = require('express');
const { actualMonthService, nextMonthService, betweenTwoDatesService } = require('./utils/service');
const { matchThisYear } = require('../utils/converter')
const { isValidDateFormat } = require('./utils/validator');
const Worker = require('../models/worker')

const app = express()


mongoose.connect('mongodb://127.0.0.1:27017/nisum-workers', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  })
  
  console.log('connected')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


// ruta front
app.get('', (req, res) => {
  res.render('index', {
    title: 'Birthday app',
  });
});

app.get('/current-month', (req, res) => {
  res.render('current-month', {
    title: 'Current Month',
  });
});

app.get('/next-month', (req, res) => {
  res.render('next-month', {
    title: 'Next Month',
  });
});

app.get('/between-dates', (req, res) => {
  res.render('between-dates', {
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

