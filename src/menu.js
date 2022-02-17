'use strict';
const inquirer = require('inquirer')
const chalk = require('chalk')
//const validateDate = require('validate-date')

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
            //sacar y transformar en funcion
            //dd/MM
            //"dd/MM" + "/" + new Date().getFullYear()
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
    const fechaInicio = today.setDate()
    const Year = today.getFullYear()
    
    const currentMonth = today.getMonth()+1
    const nextMonth = today.getMonth()+2
    let numDays = 0
    const lastmonthDay = (mes) => {
        return numDays;
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
    return strDates;
}

const questionsMenu = async() =>{
    console.log(chalk.green(' *********************************************'))
    console.log(chalk.cyan('        Welcome, please select an option            '))
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
}

const mainMenu = async () =>{
    let selection = '';
    const startDateArray = ['', '']
    const endDateArray = ['', '']
    const strDates = returnDatesArray()
    selection = await questionsMenu()
    // await pausa()
    //no se nada de promesas, esto es puro ensayo y error. 
    // while(selection !== 'Exit'){
        if (selection === 'Search in a range'){
            console.log('Please provide the first date');
            const {day, month} = await inquirer.prompt(secondQuestions)
            console.log('Please provide the second date');
            const {day2, month2} = await inquirer.prompt(thirdQuestions)
            startDateArray[0] = day
            startDateArray[1] = month
            endDateArray[0] = day2
            endDateArray[1] = month2
            
        } 
        else if (selection === 'Search in this month'){
            startDateArray[0] = strDates[0]
            startDateArray[1] = strDates[3]
            endDateArray[0] = strDates[1]
            endDateArray[1] = strDates[3]
            console.log(startDateArray, endDateArray )
        } else if (selection === 'Search in the next month'){
            startDateArray[0] = strDates[0]
            startDateArray[1] = strDates[4]
            endDateArray[0] = strDates[2]
            endDateArray[1] = strDates[4]
        } else {
            mainMenu()
        }
        await pausa()
        // mainMenu()
        return{
            startDateArray,
            endDateArray
        }
    // }
}

module.exports = {
    mainMenu,
    pausa,
}