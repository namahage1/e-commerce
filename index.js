const inquirer = require("inquirer");

const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "test",
    database: "employee_info",
    port: 5432
})

const initialize = async () => {
    const db = await pool.connect();

    inquirer.prompt([{
        type: 'list',
        name: 'user_choice',
        message: 'chose one of the option',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    }]).then(answers => {
        console.log(`user choice ${answers.user_choice}`);


        if (answers.user_choice === "view all departments") {
            db.query("SELECT * FROM department", function (err, data) {
                console.log(err)
                console.log(data.rows)
            })
        }else if(answers.user_choice === "view all roles") {
            db.query("SELECT * FROM department", function (err, data) {
                console.log(err)
                console.log(data.rows)
            })
        }else if(answers.user_choice === "view all employees") {
            db.query("SELECT * FROM department", function (err, data) {
                console.log(err)
                console.log(data.rows)
            })
        }else if(answers.user_choice === "add a department") {
            //insert
            db.query("SELECT * FROM department", function (err, data) {
                console.log(err)
                console.log(data.rows)
            })
        }else if(answers.user_choice === "add a role") {
            //insert
            db.query("SELECT * FROM department", function (err, data) {
                console.log(err)
                console.log(data.rows)
            })
        }else if(answers.user_choice === "add an employee") {
            //insert
                db.query("SELECT * FROM department", function (err, data) {
                    console.log(err)
                    console.log(data.rows)
                })
            
        }else if(answers.user_choice === "update an employee role") {
            //update 
            db.query("SELECT * FROM department", function (err, data) {
                console.log(err)
                console.log(data.rows)
            })
        }
    });
}
initialize();