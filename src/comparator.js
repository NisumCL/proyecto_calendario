// Refactorizandose ....... En proceso....
function dateComparison(date1, date2, birthday) {
  const birthdayMonth = parseInt(birthday[1], 10);
  const birthdayDay = parseInt(birthday[2], 10);
  if (birthdayMonth === date1.getMonth() + 1 && birthdayMonth === date2.getMonth() + 1) {
    if (birthdayDay >= date1.getDate() && birthdayDay <= date2.getDate()) {
      return true;
    }
  } else if (birthdayMonth === date1.getMonth() + 1) {
    if (birthdayDay >= date1.getDate()) {
      return true;
    }
  } else if (birthdayMonth === date2.getMonth() + 1) {
    if (birthdayDay <= date2.getDate()) {
      return true;
    }
  } else if (birthdayMonth > date1.getMonth() + 1 && birthdayMonth < date2.getMonth() + 1) {
    return true;
  }
  return false;
}

function biggerDate(firstDate, secondDate) {
  const differenceDate = secondDate - firstDate;
  return differenceDate >= 0;
}

module.exports = { dateComparison, biggerDate };
