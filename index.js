const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

const mainMenu = [
    {
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do?',
        choices: [{name:'View All Employees', value:''}, {name:'View All Roles', value:''}, {name:'View all Departments', value:''}, {name:'Add an Employee', value:''}, {name:'Add a department', value:''}, {name:'Add a role', value:''}, {name:'Update an employee role', value:''}]
    }
]

const init = () => {
    inquirer.prompt(mainMenu).then((data) => {
    
    })
}