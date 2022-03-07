/* eslint-disable */
function loadData(data) {
  $('.table').append(
    '<tr><td>NAME</td>' + '<td>LAST NAME</td>' + '<td>BIRTHDAY</td>' + '<td>EMAIL</td>');

  for (let i = 0; i < data.length; i++) {
    $(".table").append('<tr>' + 
    '<td align="center" style="dislay: none;">' + data[i].name + '</td>'+
    '<td align="center" style="dislay: none;">' + data[i].lastname + '</td>'+
    '<td align="center" style="dislay: none;">' + data[i].birthday + '</td>'+
    '<td align="center" style="dislay: none;">' + data[i].email + '</td>'+'</tr>');
  }
}

const form = document.querySelector('form');
form.addEventListener('click', e => {
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
