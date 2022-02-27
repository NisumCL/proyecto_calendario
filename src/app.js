const path = require('path');
const hbs = require('hbs');
const express = require('express');
const { actualMonthService, nextMonthService, betweenTwoDatesService } = require('./utils/service');
const { isValidDateFormat } = require('./utils/validator');

const app = express();
const port = 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

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

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found.',
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server is up on port 3000.');
});
