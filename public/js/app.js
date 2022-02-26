/* eslint-disable */
// const { title } = require("process")
const searchinrangeForm = document.querySelector('form')
const startingraw = document.querySelector('#Startdate')
const endingraw = document.querySelector('#Enddate')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const messageSix = document.querySelector('#message-6')
const buttonTM = document.querySelector('.buttonTM')
const buttonNM = document.querySelector('.buttonNM')

const getOptions = document.querySelector('select')
const cajaresultados = document.querySelector('.cajaresultados')

// const optrange = doument.querySelector('option')



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
                messageOne.textContent = `The birthdays for the interval are:`
                data.forEach((element)=>{
                    messageTwo.append(`${element.name} ${element.lastname}: ${element.birthday} => ${element.email} \n `)
                })
                console.table(data)
                console.log(typeof data)
            }
        })
    })

})

// const ThisMonthBody = document.getElementById("bodycontent2")
// ThisMonthBody.addEventListener("load", (e) => {

//     messageThree.textContent = 'Loading...'
//     messageFour.textContent = ''
    
//     fetch('/birthday_month_course').then((response)=> {
//         response.text().then((data)=>{
//         if(data.error){
//             messageThree.textContent = `${data.error}`
//             messageFour.textContent = ``
//         } else {
//             messageThree.textContent = `The birthdays for the interval are:`
//             // data.forEach((element) => {
//             //     messageFour.append(`${element.name} ${element.lastname}: ${element.birthday} => ${element.email} \n `)
//             // })
//             messageFour.textContent = data
//             console.table(data)
//             console.log(typeof data)
//         }
//         })
//     });
// })

const NextMonthBody = document.getElementById("bodycontent3")
NextMonthBody.addEventListener("load", (e) => {
    
    messageFive.textContent = 'Loading...'
    messageSix.textContent = ''
    
    fetch('/birthday_next_month').then((response)=> {
        response.text().then((data)=>{
        if(data.error){
            messageFive.textContent = `${data.error}`
            messageSix.textContent = ``
        } else {
            messageFive.textContent = `The birthdays for the interval are:`
            // data.forEach((element) => {
            //     messageSix.append(`${element.name} ${element.lastname}: ${element.birthday} => ${element.email} \n `)
            // })
            messageSix.textContent = data
            console.table(data)
            console.log(typeof data)
        }
        })
    });
})






