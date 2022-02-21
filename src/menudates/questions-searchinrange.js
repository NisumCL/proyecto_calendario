'use strict'
const inquirer = require('inquirer')

const secondQuestions = [
    {
        type: 'input',
        name: 'day',
        message: "Enter a day",
        validate(value) {
            const pass = value.match(
            /^((0[1-9]|[12]\d|3[01]))$/i
            );
            if (pass) {
            return true;
            }
            return 'Please enter a valid day';
            }
    },
    {
        type: 'input',
        name: 'month',
        message: "Enter a month",
        validate(value) {
            const pass = value.match(
            /^((0[1-9]|1[0-2]))$/i
            );
            if (pass) {
            return true;
            }
            return 'Please enter a valid month';
        }
    }
]

const searchInRange = async() => {
    console.log('Please provide the first date')
    const {day, month} = await inquirer.prompt(secondQuestions)
    const startDateSIR = new Date(2020, month-1, day)
    console.log('Please provide the second date')
    const {day: day2, month: month2} = await inquirer.prompt(secondQuestions) 
    const endDateSIR = new Date(2020, month2-1, day2)

    return { 
        startDateSIR,
        endDateSIR
    }
}

module.exports = {
    searchInRange
}

