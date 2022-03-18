/* eslint-disable */
const mailFormatData = (data, interval) => {
    let table = `<h4>The birthdays for the ${interval} are: </h4><table><tr><th>Name</th><th>Birthday</th><th>Email</th></tr>`
    let body = ''
    data.forEach((element) =>{
        let fullname = `<tr><td>${element.name} ${element.lastname}</td>`
        let birthday = `<td>${element.birthday}</td>`
        let mail = `<td><a href="mailto:${element.email}">${element.email}</a></td></tr>`
        body = fullname + birthday + mail
        table += body
    })
    return table +'</table>';
}

module.exports = { mailFormatData }

