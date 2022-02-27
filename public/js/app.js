/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
//traerse los datos!


const resultsTable = document.querySelector('form');

resultsTable.addEventListener('click', (e) => {
    e.preventDefault();

    console.log('testing!');

})
// eslint-disable-next-line no-undef
fetch('/birthday_month_course').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            console.log(data);
        }
    });
});