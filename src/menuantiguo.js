'use strict';
const inquirer = require('inquirer')
const chalk = require('chalk')

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
];

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
];

const questionsMenu = async() =>{
    console.clear()
    console.log(
    
        chalk.green(` ********************************************\n`),
        chalk.blue(`         __   __   ____       ____     \n`),
        chalk.blue(`        / /  / /  / ___ \\    / __  \\   \n`),
        chalk.blue(`       / /__/ /  / /__/ /   / /   \\ \\  \n`),
        chalk.blue(`      /  __  /  / ____  \\  / /    / /  \n`),
        chalk.blue(`     / /  / /  / /____/ / / /____/ /   \n`),
        chalk.blue(`    /_/  /_/  /________/ /________/    \n`),
        chalk.green(`                                            \n`),
        chalk.blueBright.bold(`  Wellcome to the birthdays application`),
        
        
    )
    console.log(chalk.green(' *********************************************'))
    console.log(chalk.cyan('             Select an option            '))
    console.log(chalk.green(' *********************************************'))
    const {selection} = await inquirer.prompt(firstQuestion);
    return selection;
    
};

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

const mainMenu = async () =>{
    let selection = '';
    const fecha1 = []
    const fecha2 = []
    const today = new Date()
    // const hoy = parseInt(today.getDate())
    
        const esteMes = today.getMonth()+1
        const proximoMes = today.getMonth()+2
        const proximoproximoMes = today.getMonth()+3
        const numDates = [ esteMes.toString(), proximoMes.toString(), proximoproximoMes.toString()
        ]
        const strDates = []
        numDates.forEach(element => {
            if(element.length < 2){
                strDates.push('0' + element)
            } else{
                strDates.push(element)
            }
            return strDates;
        });

        selection = await questionsMenu()
        await pausa();
        if (selection === 'Search in a range'){
            console.log('Please provide the first date');
            const {day, month} = await inquirer.prompt(secondQuestions)
            console.log('Please provide the second date');
            const {day2, month2} = await inquirer.prompt(thirdQuestions)
            fecha1[0] = day
            fecha1[1] = month
            fecha2[0] = day2
            fecha2[1] = month2
            
        } 
        else if (selection === 'Search in this month'){
            fecha1[0] = '01'
            fecha1[1] = strDates[0]
            fecha2[0] = '01'
            fecha2[1] = strDates[1]
            
        } else if (selection === 'Search in the next month'){
            fecha1[0] = '01'
            fecha1[1] = strDates[1]
            fecha2[0] = '01'
            fecha2[1] = strDates[2]
            
        } 
        
        return{
            fecha1,
            fecha2
        };

    // console.log(fecha1, fecha2)
};

mainMenu()

module.exports = {
    mainMenu,
    pausa,
}


// const startDate = new Date()
    // startDate.setDate(1)
    // const endDate = new Date() 
    // const numDays = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate()
    // endDate.setDate(numDays)





