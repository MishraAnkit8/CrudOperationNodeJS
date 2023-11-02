# model 
const { pgPool } = require('../../config/db.config');

module.exports .fetchAll = async ()=>{
    return pgPool.query(` SELECT id,name, email_id, phone_number, date_of_birth FROM  cruddb ; `);
}

// module.exports.createTask =  (tableId)=>{
//     const sql = {
//         text : ' INSERT INTO cruddb (name, email_id, phone_number, date_of_birth) VALUES ($1, $2, $3, $4) RETURNING id ' ,
//         values :  [tableId]
//     } ;

//     console.log('SQL object:', sql.text);
//     console.log('Table  ID:', sql.values[0]);

//     return pgPool.query(sql);

// }
module.exports.userTask = (data) => {
    console.log("Big DATA is>>>>>", data);
}

##controller 

const curdModel = require('../models/models');

module.exports.renderData = async (req, res, next) => {
    const data = await curdModel.fetchAll();
    console.log(' before rendering the template >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',data.rows)
    res.render('template', {
        taskList: data.rows
    });
    console.log(' after render the template >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',data.rows)
   
}

module.exports.insertTask = (req, res) => {
    let myData = curdModel.userTask(req.body);
    res.status(200).json({
        status:"Doneeee"
    })
}

// module.exports.createTask = async (req, res, next) => {
            

        // try {
        //     const { name, email_id, phone_number, date_of_birth } = req.body;
    
        //     // Create a new task using the TaskModel
        //     const newTask = await curdModel.create({
        //         name,
        //         email_id, 
        //         phone_number,
        //         date_of_birth
        //     });
    
        //     if (newTask) {
        //         console.log('New task created:', newTask);
        //         res.status(201).json({ status: 'done', task: newTask });
        //     } else {
        //         console.error('Failed to add the task');
        //         res.status(500).json({ status: 'error', message: 'Failed to add the task' });
        //     }
        // } catch (error) {
        //     console.error('Error creating task:', error);
        //     res.status(500).json({ status: 'error', message: 'An error occurred while adding the task' });
        // }
    // };








# router 
 const curdModel = require('../models/models');

module.exports.renderData = async (req, res, next) => {
    const data = await curdModel.fetchAll();
    console.log(' before rendering the template >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',data.rows)
    res.render('template', {
        taskList: data.rows
    });
    console.log(' after render the template >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',data.rows)
   
}

module.exports.insertTask = (req, res) => {
    let myData = curdModel.userTask(req.body);
    res.status(200).json({
        status:"Doneeee"
    })
}

// module.exports.createTask = async (req, res, next) => {
            

        // try {
        //     const { name, email_id, phone_number, date_of_birth } = req.body;
    
        //     // Create a new task using the TaskModel
        //     const newTask = await curdModel.create({
        //         name,
        //         email_id, 
        //         phone_number,
        //         date_of_birth
        //     });
    
        //     if (newTask) {
        //         console.log('New task created:', newTask);
        //         res.status(201).json({ status: 'done', task: newTask });
        //     } else {
        //         console.error('Failed to add the task');
        //         res.status(500).json({ status: 'error', message: 'Failed to add the task' });
        //     }
        // } catch (error) {
        //     console.error('Error creating task:', error);
        //     res.status(500).json({ status: 'error', message: 'An error occurred while adding the task' });
        // }
    // };








# ejs template

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Table</title>
</head>
<body>
    <h3>Add Data to the Table:</h3>
    <input type="text" placeholder="Name" id="name"><br>
    <input type="text" placeholder="Email" id="email"><br>
    <input type="text" placeholder="Phone" id="phone"><br>
    <input type="text" placeholder="DOB" id="dob"><br><br>
    <button id="addBtn">Add Data</button>

    <h3>Data Table:</h3>
    <table id="task-list" border="2">
        <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Action</th>
        </thead>
        <% taskList.forEach(function(task) { %>
            <tr>
                <td><%- task.id %></td>
                <td><%- task.name %></td>
                <td><%- task.email_id %></td>
                <td><%- task.phone_number %></td>
                <td><%- task.date_of_birth %></td>
                <td>
                    <button class="delete" data-id="<%- task.id %>">Delete</button>
                    <button class="edit" data-id="<%- task.id %>">Edit</button>
                </td>
            </tr>
        <% }); %>
    </table>

    <script>
        var addBtn = document.getElementById('addBtn');
        var taskList = document.querySelector('#task-list');

      
        addBtn.addEventListener("click", () => {
            let name = document.getElementById('name').value;
            let email = document.getElementById('email').value;
            let phone = document.getElementById('phone').value;
            let dob = document.getElementById('dob').value;

            const task = {
                name:name,
                email:email,
                phone:phone,
                dob:dob
            }
            console.log("Task>>>>>>>>>", task);
            fetch("/insertData",{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify(task)
            }).then((result) => {
                return result.json();
            }).then((data) => {
                console.log("DATA>>>>>>>>>>>>>>",data);
            }).catch((err) => {
                console.log("Error>>>>>>>>>>>");
            })
        })

        
        //addBtn.addEventListener("click", function () {
        //     // Get data from input fields
        //    var name = nameInput.value;
        //     console.log(name);
        //     var email = emailInput.value;
        //      console.log(email);
        //     var phone = phoneInput.value;
        //     console.log(phone);
        //     var dob = dobInput.value;
        //     console.log(dob);

            //create a object
            // const task = {
            //     name:nameInput,
            //     email:emailInput,
            //     phone:phoneInput,
            //     dob:dobInput
            // }

            //write a api
            

        //     // Send a request to add data to the table
        //     fetch('/create-task', {
        //         method: 'post',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(task)
               
        //     })
        //     .then(result => result.json())
        //     .then(data => {
        //         if (data.status === 'done') {
        //             // Append the new data to the table without refreshing
        //             var newRow = document.createElement('tr');
        //             newRow.innerHTML = `
        //                 <td>${data.id}</td>
        //                 <td>${name}</td>
        //                 <td>${email}</td>
        //                 <td>${phone}</td>
        //                 <td>${dob}</td>
        //                 <td>
        //                     <button class="delete" data-id="${data.id}">Delete</button>
        //                     <button class="edit" data-id="${data.id}">Edit</button>
        //                 </td>
        //             `;
        //             tableData.appendChild(newRow);

        //             // Clear input fields
        //             nameInput.value = '';
        //             emailInput.value = '';
        //             phoneInput.value = '';
        //             dobInput.value = '';
        //         } else {
        //             alert('Failed to add data to the table.');
        //         }
        //     });
        //  });

        

    </script>
</body>
</html>


#server.js


 
const express = require('express');
require('dotenv').config();

const myRouter = require('./src/router/router');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(myRouter);


app.listen(process.env.APP_PORT, () => {
    console.log(`Server started at port ${process.env.APP_PORT}`);
})
####### updated views 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Table</title>
    <style>
        .head {
            color: rgb(255, 51, 0);
            background-color: aqua;
        }

        .delete {
            color: black;
            background-color: red;
        }

        .edit {
            color: red;
            background-color: greenyellow;
        }

        /* Now start css for model form */
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.7);
        }

        .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 40%;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        }

        .modal-input {
            display: block;
            margin: 10px 0;
        }
    </style>
</head>

<body>
    <!--  This is model form -->
    <div id="editModal" class="modal">
        <div class="modal-content">
            <h3>Edit Data:</h3>
            <input type="text" class="modal-input" id="modalName" placeholder="Name">
            <input type="text" class="modal-input" id="modalEmail" placeholder="Email">
            <input type="text" class="modal-input" id="modalPhone" placeholder="Phone">
            <input type="text" class="modal-input" id="modalDob" placeholder="DOB"><br>
            <button id="updateBtn">Update</button>
        </div>
    </div>




    <h3>Add Data to the Table:</h3>
    <input type="text" placeholder="Name" id="name"><br>
    <input type="text" placeholder="Email" id="email"><br>
    <input type="text" placeholder="Phone" id="phone"><br>
    <input type="text" placeholder="DOB" id="dob"><br><br>
    <button id="addBtn">Add Data</button>

    <h3>Data Table:</h3>
    <!-- ... (your existing HTML content) ... -->

    <table id="task-list" border="2">
        <thead class="head">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Action</th>
        </thead>
        <% taskList.forEach(function(task) { %>
            <tr>
                <td data-task-id="<%- task.id %>"> <%- task.id %> </td>
                <td class="name"> <%- task.name %> </td>
                <td class="email"> <%- task.email%> </td>
                <td class="phone"> <%- task.phone %> </td>
                <td class="dob"> <%- task.dob %> </td>
                <td>
                    <button class="delete" data-task-id="<%- task.id %>">Delete</button>
                    <button class="edit" data-task-id="<%- task.id %>">Edit</button>
                </td>
            </tr>
            <% }); %>
    </table>

    <script>
        var addBtn = document.getElementById('addBtn');
        var taskList = document.querySelector('#task-list');
        var editModal = document.getElementById('editModal');
        var updateBtn = document.getElementById('updateBtn');



        addBtn.addEventListener("click", () => {
            let name = document.getElementById('name').value;
            let email = document.getElementById('email').value;
            let phone = document.getElementById('phone').value;
            let dob = document.getElementById('dob').value;

            const task = {
                name: name,
                email: email,
                phone: phone,
                dob: dob
            }
            console.log("Task>>>>>>>>>", task);
            fetch("/insertData", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task)
            }).then((result) => {
                return result.json();
            }).then((data) => {
                console.log("DATA>>>>>>>>>>>>>>", data);
                if (data.status === 'done') {
                    taskId = data.taskId;

                    console.log('id>>>>>>>>of >>>>>>', taskId)
                    //append new row to the table 
                    var newRow = document.createElement('tr');
                    newRow.innerHTML = `
                    <td>${taskId}</td>
                    <td class="name">${name}</td>
                    <td class="email">${email}</td>
                    <td class="phone">${phone}</td>
                    <td class="dob">${dob}</td>
                    <td>
                        <button class="delete" data-task-id = " ${taskId} ">Delete</button>
                        <button class="edit" data-task-id = " ${taskId} ">Edit</button>
                    </td>` ;
                    taskList.appendChild(newRow);

                    //clear input fields 
                    name.value = '';
                    email.value = '';
                    phone.value = '';
                    dob.value = '';
                }
                else {
                    alert('failed to add ')
                }

            }).catch((err) => {
                console.log("Error>>>>>>>>>>>");
            })
        });
        taskList.addEventListener('click', function (event) {
            if (event.target.classList.contains('delete')) {
                const tableItem = event.target.parentElement.parentElement;;
                console.log('event.target.parentElement', tableItem)
                const taskId = event.target.getAttribute('data-task-id');
                console.log('id for delete >>>', taskId);

                //fetching api for delete

                fetch('delete-task', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ taskId: taskId })
                })
                    // handling the peomis
                    .then((result) => {
                        if (!result.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return result.json();
                    })
                    .then((data) => {
                        if (data.status === 'done') {
                            tableItem.remove();
                        }
                        else {
                            alert('unable to delete a task');
                        }
                    })
            }
        })


        //update the table row data 
        // taskList.addEventListener('click', function (event) {
        //     if (event.target.classList.contains('edit')) {
        //         event.preventDefault();
        //         editModal.style.display = 'block';
        //         const rowItem = event.target.closest('tr');


        //         if (rowItem) { // here i am checking if row item not null
        //             const taskId = event.target.getAttribute('data-task-id');
        //             console.log(taskId)
        //             const taskNameElement = rowItem.querySelector('.name');
        //             const taskEmailElement = rowItem.querySelector('.email');
        //             const taskPhoneElement = rowItem.querySelector('.phone');
        //             const taskDobElement = rowItem.querySelector('.dob');

        //             // Get the current values
        //             const name = taskNameElement.textContent;
        //             console.log(name)
        //             const email = taskEmailElement.textContent;
        //             const phone = taskPhoneElement.textContent;
        //             const dob = taskDobElement.textContent;

        //             //get current values 
        //             modalName.value = taskNameElement.textContent;
        //             modalEmail.value = taskEmailElement.textContent;
        //             modalPhone.value = taskPhoneElement.textContent;
        //             modalDob.value = taskDobElement.textContent;

        //             console.log("modelName is", modalName.value);
        //             updateBtn.addEventListener("click", (event) => {
        //                 var modalName = document.getElementById('modalName');
        //                 var modalEmail = document.getElementById('modalEmail');
        //                 var modalPhone = document.getElementById('modalPhone');
        //                 var modalDob = document.getElementById('modalDob');

        //                 const updateData = {
        //                     updateName: modalName,
        //                     updateEmail: modalEmail,
        //                     updatePhone: modalPhone,
        //                     updateDob: modalDob
        //                 }

        //                 console.log("updated data comesin>>>", updateData);




        //                 editModal.style.display = 'none';
        //             })


        //         }
        //     }
        // });

        taskList.addEventListener("click", (event) => {
            if (event.target.classList.contains('edit')) {
                event.preventDefault();
                const rowItem = event.target.closest('tr');

                //database data comes in below fields
                const taskNameElement = rowItem.querySelector('.name');
                    const taskEmailElement = rowItem.querySelector('.email');
                    const taskPhoneElement = rowItem.querySelector('.phone');
                    const taskDobElement = rowItem.querySelector('.dob');
                    console.log("row item>",rowItem);
                    console.log(taskEmailElement,taskEmailElement,);
                editModal.style.display = 'block';
            }
        }) 



    </script>
</body>

</html>



####updated controller

    const curdModel = require('../models/models');

module.exports.renderData = async (req, res, next) => {
    const data = await curdModel.fetchAll();
    console.log(' before rendering the template >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',data.rows)
    res.render('template', {
        taskList: data.rows
    });
    console.log(' after render the template >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',data.rows)
   
}

module.exports.insertTask = async (req, res ,next) => {
    //  let myData = await  curdModel.createTask(req.body.task);
   
    //         res.status(200).json({
    //             status:"Done"
            
    //             })
    try {
        const newTask = await curdModel.createTask(req.body);
      

        if (newTask &&  newTask.rows[0].id) {
            console.log('New task created:', newTask);
            console.log('ID:', newTask.rows[0].id);
            res.status(200).json({ status: 'done', taskId: newTask.rows[0].id });
        } else {
            console.error('Failed to add the task. New task:', newTask);
            res.status(500).json({ status: 'error', message: 'Failed to add the task' });
        }
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ status: 'error', message: 'An error occurred while adding the task' });
    }
};
 
module.exports.deleteTask = async (req, res, next) => {
    try {
        const delTask = await curdModel.delete(req.body.taskId); // Assuming you pass the task ID correctly
        console.log('id... in delete ...',req.body.taskId)
        console.log('deltask ===>..',delTask);
        console.log('delcout of row ==',delTask.rowCount)

        if (delTask.rowCount === 1) {
            res.status(200).json({
                status: 'done'
            });
        } else {
            res.status(404).json({
                status: 'not found',
                message: 'Task not found'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while trying to delete the task'
        });
    }
};









### updated models  

const { pgPool } = require('../../config/db.config');

module.exports .fetchAll = async ()=>{
    return pgPool.query(` SELECT id,name, email, phone, dob FROM  crudDB ; `);
}

// module.exports.createTask = (data) => {
//     console.log("Big DATA is>>>>>", data);
//     const sql = {
//         text : ' INSERT INTO cruddb (name, email_id, phone_number, date_of_birth) VALUES ($1, $2, $3, $4) RETURNING id ' ,
//         values : [data]
//     }

//     console.log('SQL object :',  sql.text);
//     console.log('Row Id :', sql.values[0]);
//     return pgPool.query(sql.text);
// }

module.exports.createTask = (data) => {
    console.log("Big DATA is>>>>>", data);

    // Destructure the properties from the data object
    const { name, email, phone, dob } = data;

    const sql = {
        text: 'INSERT INTO crudDB (name, email, phone, dob) VALUES ($1, $2, $3, $4) RETURNING id',
        values: [name, email, phone, dob]
    }

    console.log('SQL object:', sql.text);
    console.log('Row Id:', sql.values);

    return pgPool.query(sql.text, sql.values);
}


module.exports.delete = (taskId) => {
    return new Promise((resolve, reject) => {
        pgPool.query('DELETE FROM crudDB WHERE id = $1', [taskId], (err, result) => {
            if (err) {
                console.error('Error in delete task model:', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
