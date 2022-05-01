const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
// const PORT = process.env.PORT || 3005;

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'employee'
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected" + connection.threadId);
    mainMenu();
})

const mainMenu = () => {
    inquirer.prompt({
        type: 'list',
        name: 'menu',
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

    .then(function(menuChoice) {
        console.log(menuChoice);
        if (menuChoice.menu === 'View All Employees') {
            viewAllEmployees();
        }
        else if (menuChoice.menu === 'View All Roles') {
            viewAllRoles();
        }
        else if (menuChoice.menu === 'View All Departments') {
            viewAllDepartments();
        }
        else if (menuChoice.menu === 'Add an Employee') {
            addAnEmployee();
        }
        else if (menuChoice.menu === 'Add a Department') {
            addDepartment();
        }
        else if (menuChoice.menu === 'Add a Role') {
            addRole();
        }
        else if (menuChoice.menu === 'Update an Employee Role') {
            updateEmployeeRole();
        }
    })
}

// function viewAllEmployees() {
//     console.log("Viewing All Employees:")
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

function viewAllDepartments() {
    console.log("Viewing All Departments:");
    const sql = 'SELECT * FROM department;';
    connection.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);

        mainMenu();
    })
}

// const init = () => {
//     inquirer.prompt(mainMenu).then((data) => {
    
//     })
// }