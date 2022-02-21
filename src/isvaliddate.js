const validateDate = require('validate-date')

const isValidDate = (a) => {
    let year = a.getFullYear()
    let month = a.getMonth() + 1
    let monthstring= month.toString()
    let day = a.getDate().toString()
    let daystring = day.toString()

    if(daystring.length < 2) {
        daystring = '0' + daystring
    } 
    if(monthstring.length < 2) {
        monthstring = '0' + monthstring
    } 
    atostring =`${year}/${monthstring}/${daystring}`

    if(validateDate(atostring, responseType="boolean", dateFormat="yy/mm/dd")){
        return true
    } else{
        return false
    }
    
}

module.exports = {
    isValidDate
}


