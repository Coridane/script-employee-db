const connection = require('./config/connection')
const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const chalk = require('chalk');

connection.connect((error) => {
    if (error) throw error;    
})

const mainMenu = [
    // Main menu    
    {
        type: 'rawlist',
        name: 'menu',
        message: 'Main Menu:',        
        choices: ['Employees', 'Roles', 'Departments', 'Exit'],
    },
    // Employees sub-menu    
    {    
        type: 'rawlist',
        name: 'employees',
        message: 'Employees:',        
        choices: ['View', 'Add', 'Edit', 'Delete', 'Return to Main Menu'],
        when: (answers) => answers.menu === 'Employees',
    },
    // Roles sub-menu
    { 
        type: 'rawlist',
        name: 'roles',
        message: 'Roles:',        
        choices: ['View', 'Add', 'Delete', 'Return to Main Menu'],
        when: (answers) => answers.menu === 'Roles',
    },
    // Departments sub-menu
    {        
        type: 'rawlist',
        name: 'departments',
        message: 'Departments:',        
        choices: ['View', 'Add', 'Delete', 'Return to Main Menu'],
        when: (answers) => answers.menu === 'Departments',
    },
]

function init() {
    console.log('\x1b[32m', 'You are now entering Alpha Centauri\'s system.', '\x1b[0m');
    setTimeout(prompt, 1500)
}

function prompt() {
    inquirer.prompt(mainMenu)    

// All of the functions that should follow an option

.then((answers) => {
    if (answers.employees === 'View') {        
        viewEmployees()
    }
    else if (answers.employees === 'Add') {        
        addEmployee()
    }
    else if (answers.employees === 'Edit') {        
        editEmployee()
    }
    else if (answers.employees === 'Delete') {        
        deleteEmployee()
    }
    else if (answers.roles === 'View') {        
        viewRoles()
    }
    else if (answers.roles === 'Add') {        
        addRole()    
    }
    else if (answers.roles === 'Delete') {        
        deleteRole()
    }
    else if (answers.departments === 'View') {        
        viewDepartments()
    }
    else if (answers.departments === 'Add') {        
        addDepartment()
    }    
    else if (answers.departments === 'Delete') {        
        deleteDepartment()
    }    
    else if(answers.employees === 'Return to Main Menu' || answers.roles === 'Return to Main Menu' || answers.departments === 'Return to Main Menu') {        
        main()
    }
    else if (answers.menu === 'Exit') {        
        exit()
    }
    else {            
        console.log('I do not understand. Please try again.');        
        }
    })
}

// View Employees sub-menu

const viewEmployees = () => {
    inquirer.prompt([
    {            
        type: 'rawlist',
        name: 'viewEmployees',
        message: 'View Employees:',
        choices: ['Sort by ID', 'Sort by Last Name', 'Sort by Title', 'Sort by Department', 'Sort by Manager', 'Return to Employees', 'Return to Main Menu'],        
    },
    ])
.then((answers) => {
    if (answers.viewEmployees === 'Sort by ID') {
        viewEmployeesByID()
    }
    else if (answers.viewEmployees === 'Sort by Last Name') {
        viewEmployeesByLast()
    }
    else if (answers.viewEmployees === 'Sort by Title') {
        viewEmployeesByTitle()
    }
    else if (answers.viewEmployees === 'Sort by Department') {
        viewEmployeesByDept()
    }
    else if (answers.viewEmployees === 'Sort by Manager') {
        viewEmployeesByMgr()
    }
    else if (answers.viewEmployees === 'Return to Employees') {        
        spilloff_emp()
    }
    else if (answers.viewEmployees === 'Return to Main Menu') {        
        main()
    }
    else {            
        console.log('I do not understand. Please try again.');        
     
    }})}

    viewEmployeesByID = async () => {
        console.log('');        
        console.log(chalk.black.bgMagentaBright('Viewing Employees (by ID)'));

        const [rows] = await connection.promise().query
                        (`SELECT employees.id as ID,
                        employees.first_name AS 'First Name',
                        employees.last_name AS 'Last Name',
                        roles.title AS Title,
                        departments.name as Department,
                        roles.salary as 'Salary (TPY)',
                        CONCAT (manager.first_name, ' ', manager.last_name) AS Manager
                    FROM employees
                        LEFT JOIN roles ON employees.role_id = roles.id
                        LEFT JOIN departments on roles.department_id = departments.id
                        LEFT JOIN employees manager on employees.manager_id = manager.id
                    ORDER BY ID`);
        
            console.table(rows);

            console.log('');
            
            viewEmployees()
        }

    viewEmployeesByLast = async () => {
        console.log('');
        console.log(chalk.black.bgMagentaBright('Viewing Employees (by Last)'));

        const [rows] = await connection.promise().query
                        (`SELECT employees.id as ID,
                        employees.first_name AS First,
                        employees.last_name AS Last,
                        roles.title AS Title,
                        departments.name as Department,
                        roles.salary as 'Salary (TPY)',
                        CONCAT (manager.first_name, ' ', manager.last_name) AS Manager
                    FROM employees
                        LEFT JOIN roles ON employees.role_id = roles.id
                        LEFT JOIN departments on roles.department_id = departments.id
                        LEFT JOIN employees manager on employees.manager_id = manager.id
                    ORDER BY Last`);
        
            console.table(rows);

            console.log('');
            
            viewEmployees()
        }

    viewEmployeesByTitle = async () => {
        console.log('');
        console.log(chalk.black.bgMagentaBright('Viewing Employees (by Title)'));

        const [rows] = await connection.promise().query
                        (`SELECT employees.id as ID,
                        employees.first_name AS 'First Name',
                        employees.last_name AS 'Last Name',
                        roles.title AS Title,
                        departments.name as Department,
                        roles.salary as 'Salary (TPY)',
                        CONCAT (manager.first_name, ' ', manager.last_name) AS Manager
                    FROM employees
                        LEFT JOIN roles ON employees.role_id = roles.id
                        LEFT JOIN departments on roles.department_id = departments.id
                        LEFT JOIN employees manager on employees.manager_id = manager.id
                    ORDER BY Title`);
        
            console.table(rows);

            console.log('');
            
            viewEmployees()
        }

    viewEmployeesByDept = async () => {
        console.log('');
        console.log(chalk.black.bgMagentaBright('Viewing Employees (by Department)'));

        const [rows] = await connection.promise().query
                        (`SELECT employees.id as ID,
                        employees.first_name AS 'First Name',
                        employees.last_name AS 'Last Name',
                        roles.title AS Title,
                        departments.name as Department,
                        roles.salary as 'Salary (TPY)',
                        CONCAT (manager.first_name, ' ', manager.last_name) AS Manager
                    FROM employees
                        LEFT JOIN roles ON employees.role_id = roles.id
                        LEFT JOIN departments on roles.department_id = departments.id
                        LEFT JOIN employees manager on employees.manager_id = manager.id
                    ORDER BY Department`);
        
            console.table(rows);

            console.log('');
            
            viewEmployees()
        }

    viewEmployeesByMgr = async () => {
        console.log('');
        console.log(chalk.black.bgMagentaBright('Viewing Employees (by Manager)'));

        const [rows] = await connection.promise().query
                        (`SELECT employees.id as ID,
                        employees.first_name AS 'First Name',
                        employees.last_name AS 'Last Name',
                        roles.title AS Title,
                        departments.name as Department,
                        roles.salary as 'Salary (TPY)',
                        CONCAT (manager.first_name, ' ', manager.last_name) AS Manager
                    FROM employees
                        LEFT JOIN roles ON employees.role_id = roles.id
                        LEFT JOIN departments on roles.department_id = departments.id
                        LEFT JOIN employees manager on employees.manager_id = manager.id
                    ORDER BY Manager`);
        
            console.table(rows);

            console.log('');
            
            viewEmployees()
        } 

// Add Employee

const addEmployee = () => {

// Prompt and logic for capturing the employee's name

    inquirer.prompt([
    {            
        type: 'input',
        name: 'firstName',
        message: 'Enter a first name:',
        validate: inputFirst => {
            if (inputFirst) {
            return true;
            } else {
                console.log('Please enter a first name or title (e.g., Mister).');
                return false;
            }
        },
    },
    {            
        type: 'input',
        name: 'lastName',
        message: 'Enter a last name:',
        validate: inputLast => {
            if (inputLast) {
            return true;
            } else {
                console.log('Please enter a last name. ');
                return false;
            }
        },
    },
    ])
        .then((answer) => {
    const newEmp = [answer.firstName, answer.lastName];

    // Prompt and logic for choosing the employee's role

    const pullRoles = `SELECT roles.id, roles.title FROM roles`;

    connection.promise().query(pullRoles)

    .then(([rows, fields]) => {
        const roleList = rows.map(({ id, title }) => ({
            name: title,
            value: id,
        }));

        inquirer.prompt ([
            {
                type: 'rawlist',
                name: 'employee_role',
                message: 'Choose this employee\'s role.',
                choices: roleList
            },
        ])
        .then((answer) => {
            const empRole = answer.employee_role;
            newEmp.push(empRole);

    // Prompt and logic for choosing the employee's manager

    const managers = `SELECT * FROM employees`;
    
    connection.promise().query(managers)
    
    .then(([rows, fields]) => {
        const mgrList = rows.map(({ id, first_name, last_name }) => ({
            name: first_name + ' ' + last_name,
            value: id,
        })
        );
        inquirer.prompt([
            {
                type: 'rawlist',
                name: 'empManager',
                message: 'Choose this employee\'s manager.',
                choices: mgrList
            },
        ])
        .then((answer) => {
            const empMgr = answer.empManager;
            newEmp.push(empMgr);

            const createRecords = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?)`;
        
            connection.promise().query(createRecords, newEmp)
            .then(([rows, fields]) => {                
                console.log('');
                console.log(chalk.black.bgGreen('This employee has been added!'));
                console.log('');
                spilloff_emp()
            });            
        })

    })})})})}
    
    // This is a copy of the employees prompt so that it is accessible outside of the initial chain
    const spilloff_emp = () => {
        inquirer.prompt([
            {                        
                type: 'rawlist',
                name: 'employees2',
                message: 'Employees:',        
                choices: ['View', 'Add', 'Edit', 'Delete', 'Return to Main Menu'],                                
            },
        ])
        .then((answers) => {
            if (answers.employees2 === 'View') {        
                viewEmployees()
            }
            else if (answers.employees2 === 'Add') {        
                addEmployee()
            }
            else if (answers.employees2 === 'Edit') {        
                editEmployee()
            }
            else if (answers.employees2 === 'Delete') {        
                deleteEmployee()
            }
            else if (answers.employees2 === 'Return to Main Menu') {        
                main();
        }})}

// Edit Employee sub-menu

const editEmployee = () => {
    inquirer.prompt([
        {            
            type: 'rawlist',
            name: 'editEmployee',
            message: 'Edit Employee:',
            choices: ['Change Role', 'Change Manager', 'Return to Employees', 'Return to Main Menu'],
        },
        ])
    .then((answers) => {        
        if (answers.editEmployee === 'Change Role') {
            editEmployeeRole()
        }
        else if (answers.editEmployee === 'Change Manager') {
            editEmployeeManager()
        }       
        else if (answers.editEmployee === 'Return to Employees') {        
            spilloff_emp()
        }       
        else if (answers.editEmployee === 'Return to Main Menu') {        
            main();
        }})};

// Change Employee Role

const editEmployeeRole = () => {
    let empAndRoles = `SELECT employees.id, employees.first_name, employees.last_name, roles.id AS role_id, roles.title
    FROM employees    
    INNER JOIN roles on employees.role_id = roles.id
    INNER JOIN departments ON roles.department_id = departments.id
    ORDER BY ID;`;

    connection.promise().query(empAndRoles)
    .then((response) => {
        const results = response[0];

        console.log('Results', results);

        let empArray = [];
        let rolesArray = [];

        results.forEach((employee) => {
            empArray.push(`${employee.first_name} ${employee.last_name}`);
            rolesArray.push({ id: employee.role_id, title: employee.title });
        });

        console.log('Array', rolesArray);

        let newRoleList = `SELECT DISTINCT title FROM roles`;

        console.log('New Role List', newRoleList);

        return connection.promise().query(newRoleList)
        .then((response) => {
            const titles = response[0].map((row) => row.title);

        console.log('Titles', titles);

        return inquirer.prompt([
                {            
                    type: 'rawlist',
                    name: 'editEmpRoleName',
                    message: 'Choose an employee:',
                    choices: empArray
                },
                {
                    type: 'rawlist',
                    name: 'editEmpRoleRole',
                    message: 'Choose the new role:',
                    choices: titles
                },                            
            ])
            .then((answer) => {
                let eid, rid;

                results.forEach((employee) => {
                    if (answer.editEmpRoleName === `${employee.first_name} ${employee.last_name}`)
                    {
                        eid = employee.id;
                        console.log(eid)
                    }                
            });

            rolesArray.forEach((role) => {
                if (answer.editEmpRoleRole === role.title) {
                    rid = role.id;
                }
            });

            console.log('THIS', rid)
            console.log('THIS', eid)
            let update = `UPDATE employees SET role_id = ? WHERE id = ?`;

            return connection.promise().query(update, [rid, eid]);
            })
            .then(() => {                
            console.log('');
            console.log(chalk.black.bgGreen('This employee has been updated!'));
            console.log('');
            main();
            })
            .catch((error) => {
                console.error(error);                
            });
        });
    });
};
  
// Change Employee Manager

const editEmployeeManager = () => {
    const emps = `SELECT * FROM employees`;
    
    connection.query(emps, (err, data) => {
        if (err) throw err;

    const employeeList = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));
    
        inquirer.prompt
        ([
            {
                type: 'rawlist',
                name: 'editEmpMgrName',
                message: 'Choose an employee:',
                choices: employeeList
            }
        ])
                
        .then(chosenEmp => {
            const employee = chosenEmp.editEmpMgrName;
            const newMgr = [];
            newMgr.push(employee);            

        inquirer.prompt
        ([
            {
                type: 'rawlist',
                name: 'editEmpMgrMgr',
                message: 'Choose the new manager:',
                choices: employeeList,
            }
        ])
        
        .then(chosenMgr => {
            const manager = chosenMgr.editEmpMgrMgr;            
            newMgr.push(manager);      
            
            let employee = newMgr[0]
            newMgr[0] = manager
            newMgr[1] = employee

            let update = `UPDATE employees SET manager_id = ? WHERE id = ?`;

            connection.query(update, newMgr, (err, result) => {
                if (err) throw err;
            console.log('');
            console.log(chalk.black.bgGreen('This employee has been updated!'));            
            console.log('');
            editEmployee();            
            });
        });
    });
});
};

// Delete Employee

const deleteEmployee = async () => {
    try {
        const [rows] = await connection
        .promise()
        .query(`SELECT id, first_name, last_name FROM employees`);
    
        const empArray = rows.map(
        (employee) => `${employee.first_name} ${employee.last_name}`
        );
    
        const answer = await inquirer.prompt([
        {
            type: "rawlist",
            name: "deleteEmp",
            message: "Choose an employee:",
            choices: empArray,
        },
        ]);
    
        const deletedEmp = rows.find(
        (employee) =>
            `${employee.first_name} ${employee.last_name}` === answer.deleteEmp
        );
    
        await connection
        .promise()
        .query(`DELETE FROM employees WHERE id = ?`, [deletedEmp.id]);
        console.log('');
        console.log(chalk.black.bgGreen('This employee has been removed!'));
        console.log('');
        main();
    } catch (error) {
        console.error(error);
    }
    };

// *** ROLES ***

// View Roles

const viewRoles = () => {    
    const roleList = `SELECT roles.id, roles.title, departments.name AS department
      FROM roles
      INNER JOIN departments ON roles.department_id = departments.id`;      
    connection
      .promise()
      .query(roleList)
      .then((response) => {
        // Extract the results array from the response object
        const results = response[0];

        console.log('');
        console.log(chalk.black.bgMagentaBright('Viewing Roles'));  
        results.forEach((role) => {        
        console.log(role.title);        
        });        
        console.log('');
        main();
        })
        .catch((error) => {
        console.log(error);
    });
};

// Add Role

const addRole = () => {
    console.clear()
    inquirer.prompt
    ([
        {
            type: 'input', 
            name: 'role',
            message: "What role do you want to add?",
            validate: addRole => {
                if (addRole) {
                    return true;
                } else {
                    console.log('Please enter a role');
                    return false;
                }
            }
        },
        {
            type: 'input', 
            name: 'salary',
            message: "What is the salary of this role?",
            validate: addSalary => {
                if ((addSalary) && !isNaN(addSalary)) {
                    return true;
                } else {
                    console.log('Please enter a salary');
                    return false;
            }
          }
        }
      ])
        .then(answer => {
          const input = [answer.role, answer.salary];
              
          const roleSql = `SELECT name, id FROM departments`; 
    
          connection.query(roleSql, (err, data) => {
            if (err) throw err; 
        
            const dept = data.map(({ name, id }) => ({ name: name, value: id }));
    
            inquirer.prompt([
            {
              type: 'list', 
              name: 'dept',
              message: "What department should this link to?",
              choices: dept
            }
            ])
              .then(deptChoice => {
                const dept = deptChoice.dept;
                input.push(dept);
    
                const sql = `INSERT INTO roles (title, salary, department_id)
                            VALUES (?, ?, ?)`;
    
                connection.query(sql, input, (err, result) => {
                  if (err) throw err;
                console.log('');
                console.log(chalk.black.bgGreen('This role has been added!'));
                console.log('');     
                  main();;
           });
         });
       });
     });
    };
     

// Delete Role

const deleteRole = async () => {
        
      const [rows, fields] = await connection
        .promise()
        .query(`SELECT roles.id, roles.title FROM roles`);
      const rolesArray = rows.map((row) => row.title);
  
      const answer = await inquirer.prompt([
        {
          name: "roleTitle",
          type: "list",
          message: "Choose a role:",
          choices: rolesArray,
        },
      ]);
  
      const role = rows.find((row) => row.title === answer.roleTitle);
      const [result] = await connection
        .promise()
        .query(`DELETE FROM roles WHERE id = ?`, [role.id]);
        console.log('');
        console.log(chalk.black.bgGreen('This role has been deleted!'));
        console.log('');
      main();      
    };

// *** DEPARTMENTS ***

// Departments sub-menu

// View Departments

const viewDepartments = () => {
const departmentList = `SELECT departments.id AS id, departments.name AS department FROM departments`; 

connection.query(departmentList, (err, rows) => {    
    console.log('');
    console.log(chalk.black.bgMagentaBright('Sorting by Title'));
    console.table(rows);
    console.log('');
  main();
});
};

// Add Department

const addDepartment = () => {
    inquirer.prompt([
      {
        type: 'input', 
        name: 'addDept',
        message: "Enter the new department:",
        validate: addDept => {
          if (addDept) {
              return true;
          } else {
              console.log('Please enter a department');
              return false;
          }
        }
      }
    ])
      .then(answer => {
        const sql = `INSERT INTO departments (name)
                    VALUES (?)`;
        connection.query(sql, answer.addDept, (err, result) => {
          if (err) throw err;
          console.log('');
            console.log(chalk.black.bgGreen('This department has been added!'));
            console.log('');
  
          main();
      });
    });
  };

// Delete Departments

deleteDepartment = () => {
    const departmentList = `SELECT * FROM departments`; 
  
    connection.query(departmentList, (err, data) => {
      if (err) throw err; 
  
      const dept = data.map(({ name, id }) => ({ name: name, value: id }));
  
      inquirer.prompt([
        {
          type: 'list', 
          name: 'dept',
          message: "What department do you want to delete?",
          choices: dept
        }
      ])
        .then(chosenDepartment => {
          const dept = chosenDepartment.dept;
          const sql = `DELETE FROM departments WHERE id = ?`;
  
          connection.query(sql, dept, (err, result) => {
            if (err) throw err;
            console.log('');
            console.log(chalk.black.bgGreen('This department has been deleted!'));
            console.log('');
  
          main();
        });
      });
    });
  };

function main() {    
    prompt()
}

function exit() {
    console.clear()
    console.log('\x1b[32m', 'You are now leaving Alpha Centauri\'s system. Have a nice day.', '\x1b[0m');
    setTimeout(exit, 1500);
    process.exit();
}

init()