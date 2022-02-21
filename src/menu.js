'use strict'
const inquirer = require('inquirer')
const chalk = require('chalk')

const firstQuestion = {
    type: 'list',
    name: 'selection',
    message: 'How do you want to search?',
    choices: ['Search in a range', 'Search in this month', 'Search in the next month', 'Exit']
}

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

const thirdQuestions = [
    {
        type: 'input',
        name: 'day2',
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
        name: 'month2',
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


const returnDatesArray = () => {

    // const startDate = new Date()
    // startDate.setDate(1)
    // const endDate = new Date() 
    // const numDays = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate()
    // endDate.setDate(numDays)

    const today = new Date()
    const currentMonth = today.getMonth() + 1
    const nextMonth = today.getMonth() + 2
    let numDays = 0
    const lastmonthDay = (mes) => {
        numDays = new Date(today.getFullYear(), mes, 0).getDate()
        return numDays
    }
    const firstmonthDayStr = '01'
    const lastcurrentMonthDayStr = lastmonthDay(currentMonth).toString()
    const lastnextMonthDayStr = lastmonthDay(nextMonth).toString()
    const currentMonthStr = currentMonth.toString()
    const nextMonthStr = nextMonth.toString()
    const numDates = [ firstmonthDayStr, lastcurrentMonthDayStr, lastnextMonthDayStr, currentMonthStr, nextMonthStr ]
    const strDates = []
    numDates.forEach(element => {
        if(element.length < 2){
            strDates.push('0' + element)
        } else{
            strDates.push(element)
        }
    })
    return strDates
}


const questionsMenu = async() =>{
    console.clear()
    console.log(chalk.green(' *********************************************'))
    console.log(chalk.cyan('       Welcome, please, select an option            '))
    console.log(chalk.green(' *********************************************'))
    const {selection} = await inquirer.prompt(firstQuestion)
    return selection
    
}

const pausa = async ()=>{
    const questionContinue = [
        {
            type: 'input',
            name: 'Enter',
            message: `Press ${chalk.green('Enter')} to continue\n`
        }
    ]
    await inquirer.prompt(questionContinue)
}

const assignOutputs = async(selection) => { 
    const startDateArray = []
    const endDateArray = []
    const strDates = returnDatesArray()
    if (selection === 'Search in a range'){
        const {startrangeDateArray, endrangeDateArray} = await searchInRange()
        startDateArray.push(startrangeDateArray[0], startrangeDateArray[1])
        endDateArray.push(endrangeDateArray[0], endrangeDateArray[1]) 
    }
    else if(selection === 'Search in this month'){
        startDateArray.push(strDates[0], strDates[3])
        endDateArray.push(strDates[1], strDates[3])
    } 
    else if (selection === 'Search in the next month'){
        startDateArray.push(strDates[0], strDates[4])
        endDateArray.push(strDates[2],strDates[4]) 
    } else {
        console.log('Thanks for using.')
        startDateArray
        endDateArray
    } 
    return{
        startDateArray,
        endDateArray
    }
}

const searchInRange = async() => {
    const startrangeDateArray = []
    const endrangeDateArray = []
    console.log('Please provide the first date')
    const {day, month} = await inquirer.prompt(secondQuestions)
    startrangeDateArray.push(day, month)
    console.log('Please provide the second date')
    const {day2, month2} = await inquirer.prompt(thirdQuestions) 
    endrangeDateArray.push(day2, month2)
    return { 
        startrangeDateArray, 
        endrangeDateArray 
    }
}

const mainMenu = async () =>{
    let selection = ''
    selection = await questionsMenu()
    const {startDateArray, endDateArray} = await assignOutputs(selection)
    console.log(startDateArray, endDateArray)
    return{
        startDateArray,
        endDateArray
    }
}

module.exports = {
    mainMenu,
    pausa,
}
// mainMenu()