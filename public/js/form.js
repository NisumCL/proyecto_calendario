console.log('Script Client side javascript file is loaded!');

function betweenTwoDates() {
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
}
