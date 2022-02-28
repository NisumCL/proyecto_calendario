console.log('Coneccting');

const urlNextMonth = 'http://localhost:3000/birthday_next_month';

async function loadIntoTable(urlNextMonth) {
  const response = await fetch(urlNextMonth);
  const birthdays = await response.json();
  const cols = ['name', 'lastname', 'birthday'];
  const table = document.createElement('table');
  const tr = table.insertRow(-1);

  for (let i = 0; i < cols.length; i++) {
    const theader = document.createElement('th');
    theader.innerHTML = cols[i];
    tr.appendChild(theader);
  }

  for (let i = 0; i < birthdays.length; i++) {
    trow = table.insertRow(-1);
    for (let j = 0; j < cols.length; j++) {
      const cell = trow.insertCell(-1);
      cell.innerHTML = birthdays[i][cols[j]];
    }
  }

  const el = document.getElementById('table');
  console.log('el', el);
  el.innerHTML = '';
  el.appendChild(table);
}

fetch(urlNextMonth).then(response => {
  response.json().then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data);
    }
  });
});

loadIntoTable(urlNextMonth);
