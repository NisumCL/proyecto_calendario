console.log('Next month Client side javascript file is loaded!');

function nextMonth() {
  const urlNextMonth = 'http://localhost:3000/birthday_next_month';
  loadIntoTable(urlNextMonth);
}

nextMonth();
