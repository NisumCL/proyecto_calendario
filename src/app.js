const express = require('express');
const { getBirthdaysFromStrings } = require('./utils/services');
const { isValidDateFormat } = require('./utils/validator');

const app = express();

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});

app.get('/birthday_between_dates', (req, res) => {
  const { startDate } = req.query;
  const { endDate } = req.query;

  if (!startDate || !isValidDateFormat(startDate)) {
    res.send({ error: 'Problems with startDate' });
  }
  if (!endDate || !isValidDateFormat(endDate)) {
    res.send({ error: 'Problems with endDate' });
  }
  const birthdays = getBirthdaysFromStrings(startDate, endDate);
  res.send(birthdays);
});
