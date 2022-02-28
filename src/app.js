const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { actualMonthService, nextMonthService, betweenTwoDatesService } = require('./utils/service');
const { isValidDateFormat } = require('./utils/validator');

const app = express();
//const port = 3000;

// //Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// //Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// //Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
//   );
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });

app.get('/form', (req, res) => {
  res.render('form', {
    title: 'Probando',
  });
});

app.get('/next-month', (req, res) => {
  res.render('next-month');
});

app.get('/birthday_month_course', (req, res) => {
  const birthdays = actualMonthService();
  res.send(birthdays);
});

app.get('/birthday_next_month', (req, res) => {
  const birthdays = nextMonthService();
  return res.send(birthdays);
});

app.get('/birthday_between_dates', (req, res) => {
  const { startDate, endDate } = req.query;
  // if (!startDate || !isValidDateFormat(startDate)) {
  //   return res.send({ error: 'Problems with startDate' });
  // }
  // if (!endDate || !isValidDateFormat(endDate)) {
  //   return res.send({ error: 'Problems with endDate' });
  // }
  const birthdays = betweenTwoDatesService(startDate, endDate);
  res.send(birthdays);
  //return res.status(200);
  //res.sendStatus(402);
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is up on port 3000.');
});
