'use strict';
const inquirer = require('inquirer')
const chalk = require('chalk')


const validateDayFormat = (value) =>{
    const pass = value.match(
        /^((0[1-9]|[12]\d|3[01]))$/i
        );
        if (pass) {
        return true;
        }
        return 'Please enter a valid day';
}

const validateMonthFormat = (value) => {
    const pass = value.match(
    /^((0[1-9]|1[0-2]))$/i
    );
    if (pass) {
    return true;
    }
    return 'Please enter a valid month';
}

const firstQuestion = {
    type: 'list',
    name: 'selection',
    message: 'How do you want to search?',
    choices: ['Search in a range', 'Search in this month', 'Search in the next month', 'Exit']
};

const secondQuestions = [
        {
            type: 'input',
            name: 'day',
            message: "Enter a day",
            validate : validateDayFormat(value) 
        },
        {
            type: 'input',
            name: 'month',
            message: "Enter a month",
            validate: validateMonthFormat(value)
        }
];

const thirdQuestions = [
    {
    type: 'input',
    name: 'day2',
    message: "Enter a day",
    validate : validateDayFormat(value)
    },
    {
    type: 'input',
    name: 'month2',
    message: "Enter a month",
    validate: validateMonthFormat(value)
    }
];

const returnDatesArray = () => {

    // const startDate = new Date()
    // startDate.setDate(1)
    // const endDate = new Date() 
    // const numDays = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate()
    // endDate.setDate(numDays)

    const today = new Date()
    const Year = today.getFullYear()
    const currentMonth = today.getMonth() + 1
    const nextMonth = today.getMonth() + 2
    let numDays = 0
    const lastmonthDay = (mes) => {
        numDays = new Date(today.getFullYear(), mes, 0).getDate()
        numDays.toString
        return numDays
    }
    const firstmonthDayStr = '01'
    const lastcurrentMonthDayStr = lastmonthDay(currentMonth)
    const lastnextMonthDayStr = lastmonthDay(nextMonth)
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
    return strDates;
}


const questionsMenu = async() =>{
    console.clear()
    console.log(chalk.green(' *********************************************'))
    console.log(chalk.cyan('       Welcome, please, select an option            '))
    console.log(chalk.green(' *********************************************'))
    const {selection} = await inquirer.prompt(firstQuestion);
    return selection;
    
}

const pausa = async ()=>{
    const questionContinue = [
        {
            type: 'input',
            name: 'Enter',
            message: `Press ${chalk.green('Enter')} to continue`
        }
    ];
    await inquirer.prompt(questionContinue);
};

const menuAnswers = (b,c) =>{
    const startDateArray = []
    const endDateArray = []
    const strDates = returnDatesArray()
    if(b){
        startDateArray.push(strDates[0], strDates[3])
        endDateArray.push(strDates[1], strDates[3])
    } 
    if(c){
    startDateArray.push(strDates[0], strDates[4])
    endDateArray.push(strDates[2],strDates[4]) 
    }
    return{
        startDateArray,
        endDateArray
    }
}

const mainMenu = async () =>{
    let selection = '';
    selection = await questionsMenu()
    const {b,c} = menuAnswers('Search in a range','Search in this month','Search in the next month')
    //await pausa()
    
    
        if (selection === 'Search in a range'){
            console.log('Please provide the first date')
            const {day, month} = await inquirer.prompt(secondQuestions)
            console.log('Please provide the second date')
            const {day2, month2} = await inquirer.prompt(thirdQuestions) 
            menuAnswers(a)
        }
        else if (selection === 'Search in this month'){
            menuAnswers(b)
        }
        else if (selection === 'Search in the next month'){
            menuAnswers(c)
        }
        else if (selection === 'Exit'){
            return
        } 
    
    
}

module.exports = {
    mainMenu,
    pausa,
}