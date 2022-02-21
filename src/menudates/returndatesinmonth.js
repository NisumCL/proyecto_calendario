'use strict'
const inquirer = require('inquirer')

const returnDatesinMonth = (a) => {
    const month = new Date().getMonth() + a
    const endDateM = new Date(2020, month, new Date(2020, month + 1, 0).getDate())
    const startDateM = new Date(2020, month, 1)
    return {
        startDateM, 
        endDateM
    }
}

module.exports = {
    returnDatesinMonth
}
