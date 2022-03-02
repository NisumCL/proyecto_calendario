console.log('Client side javascript file is loaded!');

async function loadIntoTable(url) {
  const response = await fetch(url);
  const birthdays = await response.json();
  const cols = ['name', 'lastname', 'birthday'];
  const table = document.createElement('table');
  const tr = table.insertRow(-1);

  cols.forEach(colsItem => {
    const theader = document.createElement('th');
    theader.innerHTML = colsItem;
    tr.appendChild(theader);
  });

  birthdays.forEach(birthday => {
    trow = table.insertRow(-1);
    cols.forEach(colsItem => {
      const cell = trow.insertCell(-1);
      cell.innerHTML = birthday[colsItem];
    });
  });

  const el = document.getElementById('table');
  console.log('el', el);
  el.innerHTML = '';
  el.appendChild(table);
}

//function nextMonth() {}
const urlNextMonth = 'http://localhost:3000/birthday_next_month';
loadIntoTable(urlNextMonth);

//module.exports = { loadIntoTable };
