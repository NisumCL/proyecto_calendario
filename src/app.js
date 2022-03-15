const express = require('express');
const { actualMonthService, nextMonthService, betweenTwoDatesService } = require('./utils/service');
const { isValidDateFormat } = require('./utils/validator');

const app = express();
const port = 3000;

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

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server is up on port 3000.');
});
