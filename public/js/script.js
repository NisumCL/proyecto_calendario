//import { loadIntoTable } from './helper';

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

  birthdays.forEach(birthdayItem => {
    trow = table.insertRow(-1);
    cols.forEach(colsItem => {
      const cell = trow.insertCell(-1);
      cell.innerHTML = birthdayItem[colsItem];
    });
  });

  const el = document.getElementById('table');
  console.log('el', el);
  el.innerHTML = '';
  el.appendChild(table);
}

// function betweenTwoDates() {}
const birthForm = document.querySelector('#birthForm');
let startDate;
let endDate;
let url;

birthForm.addEventListener('submit', event => {
  event.preventDefault();

  startDate = event.target.elements.fechaInicio.value;
  endDate = event.target.elements.fechaFin.value;
  url = `http://localhost:3000/birthday_between_dates?startDate=${startDate}&endDate=${endDate}`;
  loadIntoTable(url);
});
