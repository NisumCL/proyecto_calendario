'use strict'
const inquirer = require('inquirer')
const chalk = require('chalk')

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
    const startrangeDateArray = []
    const endrangeDateArray = []
    console.log('Please provide the first date')
    const {day, month} = await inquirer.prompt(secondQuestions)
    startrangeDateArray.push(day, month)
    console.log('Please provide the second date')
    const {day:day2, month: month2} = await inquirer.prompt(secondQuestions) 
    endrangeDateArray.push(day2, month2)
    return { 
        startrangeDateArray, 
        endrangeDateArray 
    }
}


module.exports = {
    searchInRange
}