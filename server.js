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
            db.query("SELECT * FROM role", function (err, data) {
                console.log(err)
                console.log(data.rows)
            })
        }else if(answers.user_choice === "view all employees") {
            db.query("SELECT * FROM employee", function (err, data) {
                console.log(err)
                console.log(data.rows)
            })
        }else if(answers.user_choice === "add a department") {
            //insert
            db.query("INSERT INTO department(name) VALUES ()", function (err, data) {
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
            //prompted to select an employee to update and their new role and this information is updated in the database
            db.query("SELECT id, first_name,last_name FROM employee", function (err, data) {
                
                let employeeList = data.rows;
             //   console.log(employeeList);
            
                inquirer.prompt([{
                    type: 'list',
                    name: 'user_choice',
                    message: 'select an employee',
                    choices: employeeList
                }]).then(answers => {
                    console.log(`user choice ${answers.user_choice}`);
                }); console.log(err)
               
            })
        }
    });
}

// function deleteData(db,tableName,column){
//     const sql = `DELETE FROM movies WHERE id = $1`;
//     const params = [req.params.id];
  
//     pool.query(sql, params, (err, result) => {
//       if (err) {
//         res.statusMessage(400).json({ error: err.message });
//       } else if (!result.rowCount) {
//         res.json({
//           message: 'data not found'
//         });
//       } else {
//         res.json({
//           message: 'deleted',
//           changes: result.rowCount,
//           id: req.params.id
//         });
//       }
//     });

  
// }
initialize();