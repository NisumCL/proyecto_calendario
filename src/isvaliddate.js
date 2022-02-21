const validateDate = require('validate-date')
const chalk = require('chalk');

const isValidDate = (a) => {

    if(validateDate(a, responseType="boolean", dateFormat="yy/mm/dd")){
        return true
    } else{
        return false
    }
    
}

module.exports = {
    isValidDate
}