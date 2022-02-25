const express = require('express');
const { actualMonthService, nextMonthService } = require('./utils/service');

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

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server is up on port 3000.');
});

