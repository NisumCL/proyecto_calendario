const birthdaysForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
id="Startdate
id="Enddate"


birthdaysForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    // const {startDate, endDate } = search.value

    messageOne.textContent = `Loading...`
    messageTwo.textContent = ``

    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = `${data.error}`
                messageTwo.textContent = ``
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            
            }
        })
    })
})


// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link rel="icon" href="/img/nubi.jpg">
//     <link rel="stylesheet" href="/css/styles.css">
//     <title>Weather APP</title>
// </head>
// <body>
//     <div class="main-content">
//         {{>header}}
//         <p>Use this site to get your weather!!</p>
//         <form action="">
//             <input placeholder="Location" type="text" style="padding: 7px; border-radius: 3px; border: none;">
//             <button>Search</button>
//         </form>

//         <p id="message-1"></p>
//         <p id="message-2"></p>
//     </div>
    
//     {{>footer}}

//     <script src="js/app.js"></script>
// </body>
// </html>