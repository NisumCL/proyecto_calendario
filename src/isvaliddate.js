const validateDate = require('validate-date')
const chalk = require('chalk');

const isValidDate = (a) => {
    // let regex = new RegExp(
        //     /^([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))$/
        // );
        // let dateOk = regex.test(a);
        // return dateOk;
        
    if(a.includes('-')){
        return false
    }

    if(validateDate(a, responseType="boolean", dateFormat="yy/mm/dd")){
        return true
    } else{
        return false
    }
    
}





module.exports = {
    isValidDate
}