function isValidDateFormat(date) {

  const regex = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
  const dateOk = regex.test(date);
  return dateOk;
}

module.exports = { isValidDateFormat };
