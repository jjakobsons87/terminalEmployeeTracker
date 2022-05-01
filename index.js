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
        // console.log(menuChoice);
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

function viewAllEmployees() {
    console.log("Viewing All Employees:");
    const sql = `SELECT
  empInfo.id,
  empInfo.first_name AS 'first name',
  empInfo.last_name AS 'last name',
  role.title AS 'job title',
  department.name AS 'department',
  role.salary,
  CONCAT (manager.first_name, ' ', manager.last_name) AS 'manager'
FROM
  empInfo
  JOIN role ON empInfo.role_id = role.id
  JOIN department ON role.department_id = department.id
  LEFT JOIN empInfo manager ON manager.id = empInfo.manager_id;`;
    connection.query(sql, function (err, rows) {
        if (err) throw err;
        console.table(res);

        mainMenu();
    })
}

function viewAllRoles() {
    console.log("Viewing All Roles:");
    const sql = 'SELECT * FROM role;';
    connection.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);

        mainMenu();
    })
}

function viewAllDepartments() {
    console.log("Viewing All Departments:");
    const sql = 'SELECT * FROM department;';
    connection.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);

        mainMenu();
    })
}

// const sql = 

function addAnEmployee() {
    console.log("Add an employee:");
    const sql = 'SELECT * FROM role;'
    connection.query(sql, function (err, res) {
        console.log(res);
        if (err) throw err;
        const chooseRoles = [];
        for (let i = 0; i < res.length; i++) {
            const chooseRole = {
            name: res[i].title,
            value: res[i].id,
            };
            chooseRoles.push(chooseRole);
        }

        const questions = [
            {
            type: "input",
            name: "first_name",
            message: "What is the employees first name?",
            },
            {
            type: "input",
            name: "last_name",
            message: "What is the employees last name?",
            },
            {
            type: "list",
            name: "role",
            message: "What is the employees role?",
            choices: chooseRoles
            },
            // {
            // type: "list",
            // name: "manager",
            // message: "Who is the employee's manager?",
            // choices: [{name: "None", values: "null"}, "John Doe"],
            // },
        ];

        inquirer.prompt(questions).then(function(answers) {
            const sql = "INSERT INTO empInfo (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);";
            connection.query(sql, [answers.first_name, answers.last_name, answers.role, answers.manager], function(err, res) {
                if(err) console.log(err);
                console.log("Employee added to database");
                mainMenu();
            })
        })
    })
}

function addDepartment() {
    console.log("Add a department:");
    const sql = 'INSERT INTO department (name) VALUES (?);';
    inquirer.prompt(
        {
            type: 'input',
            name: 'department',

    })
    
    connection.query(sql, params, )
    
}