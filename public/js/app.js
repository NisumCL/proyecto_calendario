/* eslint-disable */
// const { title } = require("process")
const searchinrangeForm = document.querySelector('form')
const starting = document.querySelector('#Startdate')
const ending = document.querySelector('#Enddate')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const getOptions = document.querySelector('select')
// const optrange = doument.querySelector('option')

searchinrangeForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const startDate = starting.value
    const endDate = ending.value
    
    messageOne.textContent = `Loading...`
    messageTwo.textContent = ``

    fetch(`/birthday_month_course?stardate=${startDate}&${endDate}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = `${data.error}`
                messageTwo.textContent = ``
            } else {
                messageOne.textContent = `The birthdays for the interval are: ${startDate} and ${endDate}`
                messageTwo.textContent = `${data.birthdaysList}`
            
            }
        })
    })
})





