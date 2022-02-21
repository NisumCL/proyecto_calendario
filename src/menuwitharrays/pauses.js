'use strict'
const inquirer = require('inquirer')
const chalk = require('chalk')

const pausa = async ()=>{
    const questionContinue = [
        {
            type: 'input',
            name: 'Enter',
            message: `Press ${chalk.green('Enter')} to continue`
        }
    ]
    await inquirer.prompt(questionContinue)
}

module.exports = {
    pausa
}