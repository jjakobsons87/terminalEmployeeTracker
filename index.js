const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3001',
    user: 'root',
    password: '',
    database: 'employee_db'
});

const promptChoices = () => {
    inquirer.prompt({
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do?',
        choices: [
            'View All Employees', 
            'View All Roles', 
            'View All Departments', 
            'Add an Employee', 
            'Add a department', 
            'Add a Role', 
            'Update an Employee Role']
    })

    .then(({ mainMenu }) => {
        console.log(mainMenu)
        // if (promptChoices.mainMenu === 'View All Employees') {
        //     viewAllEmployees();
        // }
        // else if (promptChoices.mainMenu === 'View All Roles') {
        //     viewAllRoles();
        // }
        // else if (promptChoices.mainMenu === 'View All Departments') {
        //     viewAllDepartments();
        // }
        // else if (promptChoices.mainMenu === 'Add an Employee') {
        //     addAnEmployee();
        // }
        // else if (promptChoices.mainMenu === 'Add a Department') {
        //     addDepartment();
        // }
        // else if (promptChoices.mainMenu === 'Add a Role') {
        //     addRole();
        // }
        // else if (promptChoices.mainMenu === 'Update an Employee Role') {
        //     updateEmployeeRole();
        // }
    })
}

// function viewAllEmployees() {
//     const sql = 'SELECT * FROM employee'
//     db.query(sql, (err, rows) => {
//         if (err) {
//             return;
//         }
//         res.json({
//             message: 'success',
//             data:rows
//         });
//     }
// )}

// const init = () => {
//     inquirer.prompt(mainMenu).then((data) => {
    
//     })
// }