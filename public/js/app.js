/* eslint-disable */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
function loadData(data){
  $(".table-results").append('<tr><td>NAME</td>'+
  '<td>LAST NAME</td>'+
  '<td>BIRTHDAY</td>' + 
  '<td>EMAIL</td>');
  for (i = 0; i < data.length; i ++){

$(".table-results").append('<tr>' + 
  '<td align="center" style="dislay: none;">' + data[i].name + '</td>'+
  '<td align="center" style="dislay: none;">' + data[i].lastname + '</td>'+
  '<td align="center" style="dislay: none;">' + data[i].birthday + '</td>'+
  '<td align="center" style="dislay: none;">' + data[i].email + '</td>'+'</tr>');
  }
}

const currentMonthForm = document.querySelector('form');

currentMonthForm.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('/birthday_month_course').then((response) => {
      response.json().then((data) => {
          if (data.error) {
              alert(`${data.error}`);
          } else {
              loadData(data);
          }
      });
  });

});
