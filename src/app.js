const express = require('express');
const { actualMonthService, nextMonthService, betweenTwoDatesService } = require('./utils/service');
const { isValidDateFormat } = require('./utils/validator');

const app = express();
const port = 3000;

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
  // eslint-disable-next-line no-console
  console.log('Server is up on port 3000.');
});
