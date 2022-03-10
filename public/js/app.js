/* eslint-disable */
function loadData(data) {
  $('.table').append('<tr><th>name</th>' + '<th>lastname</th>' + '<th>birthday</th>');

  for (let i = 0; i < data.length; i++) {
    $('.table').append(
      '<tr>' +
        '<td align="center" style="dislay: none;">' +
        data[i].name +
        '</td>' +
        '<td align="center" style="dislay: none;">' +
        data[i].lastname +
        '</td>' +
        '<td align="center" style="dislay: none;">' +
        data[i].birthday +
        '</td>'
    );
  }
}

window.addEventListener('load', e => {
  console.log('Hola');
  e.preventDefault();
  fetch('/birthday_month_course').then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadData(data);
      }
    });
  });
});
