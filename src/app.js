const express = require('express');
const { actualMonthService, nextMonthService, betweenTwoDatesService } = require('./utils/service');
const { isValidDateFormat } = require('./utils/validator');
const path= require('path');
const hbs = require('hbs')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

const app = express();
const port = 3000;

app.get('', (req, res) =>{
  res.render('index', {
      title: 'NISUM Birthdays',
      body: 'birthdays list'
  })
  
})

app.get('/thismonth', (req, res) =>{
  res.render('thismonth', {
      title: 'Birthdays in the month',
  })
})

app.get('/nextmonth', (req, res) =>{
  res.render('nextmonth', {
      title: 'Birthdays in the next month',
  })
})

app.get('/searchinrange', (req, res) =>{
  res.render('searchinrange', {
      title: 'Birthdays in the Range',
  })
})

app.get('*', function(req, res){
  res.render('errorpage');
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

app.listen(port, () => {
  console.log('Server is up on port 3000.');
});
