/* eslint-disable */
// const { title } = require("process")
const searchinrangeForm = document.querySelector('form')
const startingraw = document.querySelector('#Startdate')
const endingraw = document.querySelector('#Enddate')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const buttonTM = document.querySelector('.buttonTM')
const buttonNM = document.querySelector('.buttonNM')


const formatData = (data) =>{
    messageOne.textContent = `The birthdays for the interval are:`
    messageTwo.innerHTML = `<tr>
                                <th>Name</th>
                                <th>Birthday</th>
                                <th>Email</th>
                            </tr>`
    data.forEach((element) =>{
        messageTwo.innerHTML += `
            <tr>
                <td>${element.name} ${element.lastname}</td>
                <td>${element.birthday}</td>
                <td>${element.email}</td>
            </tr>
            `
    })
}

searchinrangeForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = `Loading...`
    messageTwo.textContent = ``
    const startDate = startingraw.value.toString().replace('-', '/').replace('-', '/')
    const endDate = endingraw.value.toString().replace('-', '/').replace('-', '/')
    // const startt = `${starting.slice(6)}/${starting.substring(3,5)}/${starting.substring(0,2)}`
    // const endd = `${ending.slice(6)}/${ending.substring(3,5)}/${ending.substring(0,2)}`
    const url = '/birthday_between_dates?startDate=' + startDate + '&endDate=' + endDate
    fetch(url).then((response)=>{
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = `${data.error}`
                messageTwo.textContent = ``
            } else {
                formatData(data)
            }
        })
    })
})

buttonTM.addEventListener("click", (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/birthday_month_course').then((response)=> {
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = `${data.error}`
                messageTwo.textContent = ``
            } else {
                formatData(data)
            }
        })
    });
})

buttonNM.addEventListener("click", (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('/birthday_next_month').then((response)=> {
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = `${data.error}`
                messageTwo.textContent = ``
            } else {
                formatData(data)
                console.log(data)
            }
        })
    });
})






